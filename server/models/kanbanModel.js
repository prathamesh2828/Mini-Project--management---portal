const mongoose = require("mongoose");

const kanbanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
  assignedTo: [
    {
      name: String,
      avatar: String,
    },
  ],
  status: { type: String, enum: ["To Do", "In Progress", "Completed"], default: "To Do" },
}, { timestamps: true });

const Kanban = mongoose.model("Kanban", kanbanSchema);

module.exports = Kanban;
