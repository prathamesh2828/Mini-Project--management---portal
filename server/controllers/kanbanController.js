const Kanban = require("../models/kanbanModel");

const addKanban = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo, status } = req.body;

    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate)) {
      return res.status(400).json({ message: "Invalid dueDate format" });
    }

    const newKanban = new Kanban({
      title,
      description,
      dueDate: parsedDueDate,
      priority,
      assignedTo,
      status,
    });

    await newKanban.save();
    res.status(201).json({ message: "Kanban task added successfully", kanban: newKanban });
  } catch (err) {
    res.status(500).json({ message: "Error adding kanban task", error: err.message });
  }
};

const getKanbans = async (req, res) => {
  try {
    const kanbans = await Kanban.find();
    res.status(200).json(kanbans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching kanban tasks", error: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedTask = await Kanban.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task status", error: err.message });
  }
};
const getTaskStats = async (req, res) => {
  try {
    const stats = await Kanban.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Format the stats into a key-value object
    const taskStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.status(200).json({
      total: stats.reduce((sum, stat) => sum + stat.count, 0),
      toDo: taskStats["To Do"] || 0,
      inProgress: taskStats["In Progress"] || 0,
      completed: taskStats["Completed"] || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching task stats", error: err.message });
  }
};
module.exports = { addKanban, getKanbans, updateTaskStatus,getTaskStats };
