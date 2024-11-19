const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDetails: { type: String, required: true },
  deadline: { type: Date, required: true },
  prj_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true },
});

module.exports = mongoose.model('Task', TaskSchema);
