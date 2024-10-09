"use server";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/getSession";
import { Habit } from "@/models/Habit";
import { HabitEntry } from "@/models/HabitEntry";
import { User } from "@/models/User";


const addHabitEntry = async (entryData) => {
    // Ensure a fresh DB connection
    await connectDB();
  console.log('======================================================');

  // console.log('Habit ID:', entryData.habitId);
  const checkHabit = entryData.habitId;
  const habitName = await Habit.findOne({_id: entryData.habitId});
  console.log("Habit Clicked: ",habitName.habitName)

  const session = await getSession();
  const user = session?.user;

  // Check if the user exists
  const userRecord = await User.findOne({ email: user?.email });
  if (!userRecord) {
    console.error("User not found");
    return; // Handle error (user not found)
  }

  console.log("User: ", userRecord.firstName);
  // all habits
  const allHabits = await Habit.find({ createdBy: userRecord._id }); // Adjust if habits are stored differently

  const latestEntry = await HabitEntry.findOne({
    habit: checkHabit,
    user: userRecord._id,
  })
  .sort({ date: -1 }) // Sort by `date` in descending order for the latest entry
  .exec();

  console.log("latest entry: ", latestEntry._id)

  if (latestEntry) {
    // Toggle the completed status
    latestEntry.completed = !latestEntry.completed;
  
    // Save the updated entry
    await latestEntry.save();
    
    console.log(`Habit entry updated. Completed: ${latestEntry.completed}`);
  } else {
    console.log("No habit entries found.");
  }
  
  console.log('======================================================');
  

};

const fetchHabitEntries = async (habitId) => {
  await connectDB();
  const allHabitEntries = await HabitEntry.find({habitId});
  return allHabitEntries;
};

export { addHabitEntry, fetchHabitEntries };
