const TaskModel = require('../models/Task'); // Assuming you have the TaskModel as defined
const StudentModel = require('../models/Student'); // Assuming you have a Student model
const ProjectModel = require('../models/Project'); // Assuming you have a Project model

// Create Task API endpoint
exports.createTask = async (req, res) => {
  const { taskName, taskDetails, deadline } = req.body;

  try {
    // Create a new task
    const newTask = new TaskModel({
      taskName,
      taskDetails,
      deadline,
      // Assuming assignedTo is an array of student IDs and prj_id is a reference to a project
      assignedTo: [], // You can populate this later based on the task assignment logic
      prj_id: null, // Set prj_id if available
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    res.status(201).json({ status: 'Success', task: savedTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ status: 'Error', message: 'Failed to create task' });
  }
};
