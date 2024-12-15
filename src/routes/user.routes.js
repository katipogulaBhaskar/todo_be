import express from "express";
import { logInUser, signUpUser, logoutUser } from '../controller/user.controller.js';

import { addToDoList, editToDoList, completeToDoList, deleteToDoList, fetchAllTasks } from "../controller/todolist.controller.js";

const router = express.Router();

router.post('/signupUser', signUpUser);

router.post('/loginUser', logInUser);

router.post('/logout', logoutUser);

// Route to add a task
router.get('/fetchAll/:userId', fetchAllTasks); // Fetch all tasks for a user

// Route for adding a task to a specific to-do list (listId)
router.post('/add', addToDoList); // Add a new To-Do List
router.put('/edit', editToDoList); // Edit an existing To-Do List
router.patch('/complete', completeToDoList); // Mark a To-Do List as completed
router.delete('/delete', deleteToDoList); // Delete a To-Do List

export default router;