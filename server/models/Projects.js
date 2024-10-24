const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  prj_id :Number,
  prj_name: String,
  description: { type: String },
  gd_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide' // Reference to the Team(s) they guide
  }]
});

const ProjectModel = mongoose.model('Projects', ProjectSchema);
module.exports = ProjectModel;
