const Kanban = require("../models/kanbanModel");

// Add new kanban task
const addKanban = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo, status } = req.body;

    // Create new kanban task
    const newKanban = new Kanban({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      status,
    });

    await newKanban.save();
    res.status(201).json({ message: "Kanban task added successfully", kanban: newKanban });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding kanban task", error: err.message });
  }
};

// Get all kanban tasks
const getKanbans = async (req, res) => {
  try {
    const kanbans = await Kanban.find();
    res.status(200).json(kanbans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching kanban tasks", error: err.message });
  }
};

module.exports = { addKanban, getKanbans };
