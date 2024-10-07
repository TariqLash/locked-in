import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    habitName:{type:String, required:true},
    description:{type:String, required:true},
    dateCreated:{ type: Date, default: Date.now },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  // Reference to the User model
        required: true 
      },
});

export const Habit = mongoose.models?.Habit || mongoose.model("Habit", habitSchema);