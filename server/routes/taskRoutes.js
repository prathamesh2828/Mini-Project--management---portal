// In taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const TaskModel = require('../models/Task')
// POST route to create a new task
router.post('/tasks', taskController.createTask);

// GET route to fetch tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json({ status: 'Success', tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ status: 'Error', message: 'Failed to fetch tasks' });
  }
});

module.exports = router;
