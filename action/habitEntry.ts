"use server";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/getSession";
import { HabitEntry } from "@/models/HabitEntry";
import { User } from "@/models/User";


const completeHabit = async (entryData:any) => {
  await connectDB();

  const session = await getSession();
  const user = session?.user;

  const userRecord = await User.findOne({ email: user?.email });
  if (!userRecord) {
    console.error("User not found");
    return;
  }

  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const todayEntry = await HabitEntry.findOne({
    habit: entryData.habitId,
    user: userRecord._id,
    date: { $gte: startOfDay, $lt: endOfDay },
  });

  if (todayEntry) {
    todayEntry.completed = !todayEntry.completed;
    await todayEntry.save();
  } else {
    await HabitEntry.create({
      habit: entryData.habitId,
      user: userRecord._id,
      date: today,
      completed: true,
    });
  }
};

const fetchHabitEntries = async (habitId:any) => {
  await connectDB();
  const allHabitEntries = await HabitEntry.find({habitId});
  return allHabitEntries;
};

export { completeHabit, fetchHabitEntries };
