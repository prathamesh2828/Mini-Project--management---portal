const TaskModel = require('../models/Task');
const fs = require('fs');
const path = require('path');

// Update task status and file
exports.updateTask = async (req, res) => {
  const { status, completedDate } = req.body;
  const taskId = req.params.id;

  try {
    const task = await TaskModel.findByIdAndUpdate(
      taskId,
      { status, completedDate },
      { new: true }
    );

    res.status(200).json({ status: 'Success', task });
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({
      status: 'Error',
      message: 'Failed to update task',
      error: error.message,
    });
  }
};

// Handle file upload
exports.uploadFile = async (req, res) => {
  const taskId = req.params.id;
  const file = req.files.file;

  try {
    const uploadPath = path.join(__dirname, '../uploads/', file.name);
    await file.mv(uploadPath);

    const task = await TaskModel.findByIdAndUpdate(
      taskId,
      { fileUrl: `/uploads/${file.name}` },
      { new: true }
    );

    res.status(200).json({ status: 'Success', task });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({
      status: 'Error',
      message: 'File upload failed',
      error: error.message,
    });
  }
};
