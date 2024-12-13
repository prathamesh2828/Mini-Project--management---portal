const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const Task = require('../models/Task');
const fileUpload = require('express-fileupload');

// POST route to upload file
router.use(fileUpload());
router.post('/tasks/upload/:id', taskController.uploadFile);

// PUT route to update task status
router.put('/tasks/:id', taskController.updateTask);
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();  // Fetch tasks from the database
    res.json({ tasks: tasks, message: 'Tasks fetched successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});
router.post('/tasks', async (req, res) => {
  try {
    const { taskName, taskDetails, deadline, prj_id } = req.body;

    // Check if any required field is missing
    if (!taskName || !taskDetails || !deadline || !prj_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newTask = new Task({
      taskName,
      taskDetails,
      deadline,
      prj_id, // The ID of the project this task belongs to
    });

    // Save the new task to the database
    await newTask.save();
    res.status(201).json({ task: newTask, message: 'Task created successfully!' });
  } catch (error) {
    // Log the error details for better debugging
    console.error('Error creating task:', error);

    // Respond with a more detailed error message
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});



router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});



module.exports = router;
