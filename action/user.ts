"use server";

import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

// Reuse MongoDB connection
await connectDB();

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

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

  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all fields");
  }

  await connectDB(); // Ensure the database connection is established

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    // Hash the password (using lower salt rounds to reduce time)
    const hashedPassword = await hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      habits: [],  // Initialize with empty habits
    });

    console.log(`User created successfully 🥂:`, newUser);

    // Redirect to login after successful registration
    redirect("/login");

  } catch (error) {
    // Add more specific error handling based on the error type
    console.error("Error during registration:", error);
    throw new Error("Registration failed. Please try again.");
  }
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

export { register, login, fetchAllUsers };
