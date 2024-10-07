"use server";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/getSession";
import { Habit } from "@/models/Habit";
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
  // if(user) redirect("/");
  console.log("Session:", session);
  console.log("User object:", user);
  console.log("User ID:", user?.id);


  if (!habitName || !description) {
    throw new Error("Please fill all fields");
  }

  await connectDB();

  // existing user
//   const existingUser = await User.findOne({ email });
//   if (existingUser) throw new Error("User already exists");

//   const hashedPassword = await hash(password, 12);
  const newHabit = await Habit.create({ habitName, description });

  const updateResult = await User.updateOne(
    { _id: user?.id },
    { $push: { habits: newHabit._id } }
  );

  console.log(`Update Result: `, updateResult);

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

export { addHabit, fetchAllHabits };