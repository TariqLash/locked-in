"use server";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/getSession";
import { Habit } from "@/models/Habit";
import { User } from "@/models/User";
import { redirect } from "next/navigation";


const addHabitEntry = async (formData: FormData) => {

//   const habitName = formData.get("completed") as boolean;
  

  const session = await getSession();
  const user = session?.user;

  //   console.log("Session:", session);
  // console.log("User object:", user);

  // Find the user by their unique email address
  const userRecord = await User.findOne({ email: user?.email });  // Assuming user?.email exists in the session
  console.log("ID: ",userRecord?._id);


  if (!habitName || !description) {
    throw new Error("Please fill all fields");
  }

  await connectDB();
  const newHabit = await Habit.create({ habitName, description, createdBy: userRecord?._id });


  const updateResult = await User.updateOne(
    { _id: userRecord?._id },
    { $push: { habits: newHabit._id } }
  );

  console.log(`Update Result: `, updateResult);

  redirect("/private/dashboard");

};

const fetchAllHabits = async () => {
  await connectDB();
  const habits = await Habit.find({});
  return habits;
};

export { addHabitEntry};