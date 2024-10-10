import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String},
    email:{type:String, required:true, unique: true },
    password:{type:String, select:false},
    role:{type:String, default:'user'},
    image:{type:String},
    authProviderId: {type: String},

    // Array of references to habits
    habits: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Habit'  // This refers to the 'Habit' model/collection
    }]
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);