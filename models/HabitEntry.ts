import mongoose from "mongoose";

const habitEntrySchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true }, // Reference to the Habit
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // Reference to the User
  date: { type: Date, required: true, default: Date.now },  // Date of the entry
  completed: { type: Boolean, default: false },  // Status of the habit completion
});

export const HabitEntry = mongoose.models?.HabitEntry || mongoose.model("HabitEntry", habitEntrySchema);
