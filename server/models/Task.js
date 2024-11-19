const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDetails: { type: String, required: true },
  deadline: { type: Date, required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  prj_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;
