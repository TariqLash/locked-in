import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    habitName:{type:String, required:true},
    description:{type:String, default: ''},
    dateCreated:{ type: Date, default: Date.now },
    order: { type: Number, default: 0 },
    schedule: { type: [Number], default: [0,1,2,3,4,5,6] },
    color: { type: String, default: 'green' },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
      },
});

export const Habit = mongoose.models?.Habit || mongoose.model("Habit", habitSchema);