"use server";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/getSession";
import { Habit } from "@/models/Habit";
import { HabitEntry } from "@/models/HabitEntry";
import { User } from "@/models/User";


const completeHabit = async (entryData:any) => {
    // Ensure a fresh DB connection
    await connectDB();

  const checkHabit = entryData.habitId;
  const habitName = await Habit.findOne({_id: entryData.habitId});

  const session = await getSession();
  const user = session?.user;

  // Check if the user exists
  const userRecord = await User.findOne({ email: user?.email });
  if (!userRecord) {
    console.error("User not found");
    return; // Handle error (user not found)
  }

  // all habits
  const allHabits = await Habit.find({ createdBy: userRecord._id }); // Adjust if habits are stored differently

  const latestEntry = await HabitEntry.findOne({
    habit: checkHabit,
    user: userRecord._id,
  })
  .sort({ date: -1 }) // Sort by `date` in descending order for the latest entry
  .exec();

  console.log(latestEntry)

  if (latestEntry) {
    // Toggle the completed status
    latestEntry.completed = !latestEntry.completed;
  
    // Save the updated entry
    await latestEntry.save();
    
  } else {
  }
  
  

};

const fetchHabitEntries = async (habitId:any) => {
  await connectDB();
  const allHabitEntries = await HabitEntry.find({habitId});
  return allHabitEntries;
};

export { completeHabit, fetchHabitEntries };
