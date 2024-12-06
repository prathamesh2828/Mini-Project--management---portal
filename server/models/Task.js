const mongoose = require('mongoose'); // Add this line to import mongoose
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDetails: { type: String, required: true },
  deadline: { type: Date, required: true },
  prj_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true },
  status: { type: String, default: 'Pending' },
  completedDate: { type: Date },
  fileUrl: { type: String }, // New field for file URL
});

module.exports = mongoose.model('Task', TaskSchema);
