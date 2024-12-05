const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  prj_id: { type: Number, unique: true },
  prj_name: String,
  description: String,
  gd_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guide' }],
});

const ProjectModel = mongoose.model('Projects', ProjectSchema);
module.exports = ProjectModel;
