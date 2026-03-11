"use server";

import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { Habit } from "@/models/Habit";
import { HabitEntry } from "@/models/HabitEntry";
import { redirect } from "next/navigation";
import { hash, compare } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";
import { getSession } from "@/lib/getSession";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await connectDB(); // Ensure the database connection is established

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }

  redirect("/");
};

const register = async (formData: FormData) => {
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all fields");
  }

  await connectDB();

  // existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hash(password, 12);

  await User.create({ firstName, lastName, email, password: hashedPassword });
  console.log(`User created successfully 🥂`);
  redirect("/login");
};

const fetchAllUsers = async () => {
  await connectDB(); // Ensure the database connection is established
  try {
    // Fetch all users from the database
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users.");
  }
};

const updateProfile = async (firstName: string, lastName: string) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) throw new Error("Not authenticated");
  await connectDB();
  await User.findOneAndUpdate({ email: user.email }, { firstName, lastName });
};

const changePassword = async (currentPassword: string, newPassword: string) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) throw new Error("Not authenticated");
  await connectDB();
  const userRecord = await User.findOne({ email: user.email }).select("+password");
  if (!userRecord?.password) throw new Error("No password set on this account");
  const valid = await compare(currentPassword, userRecord.password);
  if (!valid) throw new Error("Current password is incorrect");
  const hashed = await hash(newPassword, 12);
  await User.findOneAndUpdate({ email: user.email }, { password: hashed });
};

const deleteAccount = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) throw new Error("Not authenticated");
  await connectDB();
  const userRecord = await User.findOne({ email: user.email });
  if (!userRecord) throw new Error("User not found");
  const habits = await Habit.find({ createdBy: userRecord._id });
  const habitIds = habits.map((h: any) => h._id);
  await HabitEntry.deleteMany({ habit: { $in: habitIds } });
  await Habit.deleteMany({ createdBy: userRecord._id });
  await User.findByIdAndDelete(userRecord._id);
  await signOut({ redirectTo: "/" });
};

export { register, login, fetchAllUsers, updateProfile, changePassword, deleteAccount };
