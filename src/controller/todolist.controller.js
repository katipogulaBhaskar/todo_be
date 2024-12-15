import User from '../models/user.model.js'; // assuming User is in the models folder

// Add a new ToDo List
export const addToDoList = async (req, res) => {
    const { userId, data } = req.body;  // assuming you're sending userId and data for the To-Do List in the body

    try {
        // Find the user by ID and push the new To-Do List
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.toDoLists.push({ data, completed: false }); // Add new To-Do List with default completed as false
        await user.save();

        res.status(201).json({ message: 'To-Do List added successfully', toDoLists: user.toDoLists });
    } catch (error) {
        res.status(500).json({ message: 'Error adding To-Do List', error: error.message });
    }
};

// Edit an existing ToDo List
export const editToDoList = async (req, res) => {
    const { userId, listId, newData } = req.body;  // Assuming you're passing the userId, listId and the new data

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const toDoList = user.toDoLists.id(listId);

        if (!toDoList) {
            return res.status(404).json({ message: 'To-Do List not found' });
        }

        toDoList.data = newData;  // Update the data with new value
        await user.save();

        res.status(200).json({ message: 'To-Do List updated successfully', toDoLists: user.toDoLists });
    } catch (error) {
        res.status(500).json({ message: 'Error updating To-Do List', error: error.message });
    }
};

// Mark a ToDo List as completed (PATCH request)
export const completeToDoList = async (req, res) => {
    const { userId, listId } = req.body;  // Assuming you're passing the userId and listId

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const toDoList = user.toDoLists.id(listId);

        if (!toDoList) {
            return res.status(404).json({ message: 'To-Do List not found' });
        }

        toDoList.completed = true;  // Set the 'completed' field to true
        await user.save();

        res.status(200).json({ message: 'To-Do List marked as completed', toDoLists: user.toDoLists });
    } catch (error) {
        res.status(500).json({ message: 'Error completing To-Do List', error: error.message });
    }
};

// Delete a ToDo List
// Delete a ToDo List
export const deleteToDoList = async (req, res) => {
    const { userId, listId } = req.body; // Assuming you're passing the userId and listId

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Use pull() to remove the subdocument by its ID
        user.toDoLists.pull({ _id: listId });
        await user.save();

        res.status(200).json({ message: 'To-Do List deleted successfully', toDoLists: user.toDoLists });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting To-Do List', error: error.message });
    }
};



// Fetch all To-Do Lists for a user
export const fetchAllTasks = async (req, res) => {
    const { userId } = req.params; // Assuming you're passing userId as a URL parameter

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'To-Do Lists fetched successfully', toDoLists: user.toDoLists });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching To-Do Lists', error: error.message });
    }
};
