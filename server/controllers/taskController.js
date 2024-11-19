const TaskModel = require('../models/Task');
const StudentModel = require('../models/Student');
const ProjectModel = require('../models/Projects');

exports.createTask = async (req, res) => {
  const { taskName, taskDetails, deadline, teamId } = req.body;

  // Validate incoming data
  if (!taskName || !taskDetails || !deadline || !teamId) {
    return res.status(400).json({
      status: 'Error',
      message: 'All fields are required',
    });
  }

  try {
    const newTask = new TaskModel({
      taskName,
      taskDetails,
      deadline,
      prj_id: teamId,
    });

    const savedTask = await newTask.save();

    res.status(201).json({ status: 'Success', task: savedTask });
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({
      status: 'Error',
      message: 'Failed to create task',
      error: error.message,
    });
  }
};

