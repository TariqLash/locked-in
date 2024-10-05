import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    habitName:{type:String, required:true},
    description:{type:String, required:true},
    dateCreated:{ type: Date, default: Date.now },
});

export const Habit = mongoose.models?.Habit || mongoose.model("Habit", habitSchema);