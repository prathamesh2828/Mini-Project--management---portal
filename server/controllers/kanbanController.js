const Kanban = require("../models/kanbanModel");

// Add new kanban task
const addKanban = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo, status } = req.body;

    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate)) {
      return res.status(400).json({ message: "Invalid dueDate format" });
    }const Kanban = require("../models/kanbanModel");

    // Add new kanban task
    const addKanban = async (req, res) => {
      try {
        const { title, description, dueDate, priority, assignedTo, status } = req.body;
    
        // Validate and parse dueDate
        const parsedDueDate = new Date(dueDate);
        if (isNaN(parsedDueDate)) {
          return res.status(400).json({ message: "Invalid dueDate format" });
        }
    
        // Create new kanban task
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

// Update task status
// Update task status
// Update task status
const updateTaskStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const updatedTask = await Kanban.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating task status", error: err.message });
  }
};





// Delete task
const deleteKanban = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Kanban.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};

module.exports = { addKanban, getKanbans, updateTaskStatus, deleteKanban };
