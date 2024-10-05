"use server";
import connectDB from "@/lib/db";
import { Habit } from "@/models/Habit";
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

  if (!habitName || !description) {
    throw new Error("Please fill all fields");
  }

  await connectDB();

  // existing user
//   const existingUser = await User.findOne({ email });
//   if (existingUser) throw new Error("User already exists");

//   const hashedPassword = await hash(password, 12);
  await Habit.create({ habitName, description });
  console.log(`Habit created successfully 🥂`);
  console.log(habitName);
  console.log(description);
  redirect("/private/dashboard");
};

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