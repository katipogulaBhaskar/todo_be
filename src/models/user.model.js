import mongoose from "mongoose";

// Modified schema with only data and completed in the toDoList
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    toDoLists: [
        {
            data: { type: String, required: true },      // Name of the To-Do List
            completed: { type: Boolean, default: false }, // Completion status of the To-Do List
        },
    ],
});

// Model
const User = mongoose.model("Sample", UserSchema);

export default User;

