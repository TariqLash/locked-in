"use server";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/getSession";
import { Habit } from "@/models/Habit";
import { HabitEntry } from "@/models/HabitEntry";
import { User } from "@/models/User";
import { redirect } from "next/navigation";



// const login = async (formData: FormData) => {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   try {
//     await signIn("credentials", {
//       redirect: false,
//       callbackUrl: "/",
//       email,
//       password,
//     });
//   } catch (error) {
//     const someError = error as CredentialsSignin;
//     return someError.cause;
//   }
//   redirect("/");
// };

const addHabit = async (formData: FormData) => {
  const habitName = formData.get("habitName") as string;
  const description = formData.get("description") as string;

  const session = await getSession();
  const user = session?.user;

  //   console.log("Session:", session);
  // console.log("User object:", user);

  // Find the user by their unique email address
  const userRecord = await User.findOne({ email: user?.email });  // Assuming user?.email exists in the session


  if (!habitName || !description) {
    throw new Error("Please fill all fields");
  }

  await connectDB();

  // existing user
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) throw new Error("User already exists");

  //   const hashedPassword = await hash(password, 12);
  const newHabit = await Habit.create({ habitName, description, createdBy: userRecord?._id });
  const newHabitEntry = await HabitEntry.create({
                    habit: newHabit._id,
                    user: userRecord?._id,
                    completed: false,
                });
  const updateResult = await User.updateOne(
    { _id: userRecord?._id },
    { $push: { habits: newHabit._id } }
  );

  redirect("/private/dashboard");

};

// Step 3: Update the user's habits array



// const fetchAllUsers = async () => {
//   await connectDB();
//   const users = await User.find({});
//   return users;
// };

const fetchAllHabits = async () => {
  await connectDB();
  const habits = await Habit.find({});
  return habits;
};

const fetchAllUserHabits = async (user:any) => {
  await connectDB();
  const userRecord = await User.findOne({ email: user?.email });  // Assuming user?.email exists in the session
  const habits = await Habit.find({createdBy: userRecord?._id});
  return habits;
};

const deleteHabit = async (habitId:any) => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    throw new Error("User not authenticated");
  }

  await connectDB();

  // Find the habit by ID
  const habit = await Habit.findById(habitId);
  if (!habit) {
    throw new Error("Habit not found");
  }

  // Check if the habit was created by the current user
  const userRecord = await User.findOne({ email: user?.email });
  if (habit.createdBy.toString() !== userRecord?._id.toString()) {
    throw new Error("Unauthorized to delete this habit");
  }

  // Delete associated entries for the habit
  await HabitEntry.deleteMany({ habit: habitId });

  // Delete the habit itself
  await Habit.findByIdAndDelete(habitId);

  // Optionally, you might want to remove the habit from the user's habits array
  await User.updateOne(
    { _id: userRecord?._id },
    { $pull: { habits: habitId } } // Use $pull to remove the habit ID from the habits array
  );

  redirect("/private/dashboard");
};

// Export the deleteHabit function along with others
export { addHabit, fetchAllHabits, fetchAllUserHabits, deleteHabit };