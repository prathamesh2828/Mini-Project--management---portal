const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  grp_id: { type: String, unique: true }, // Unique group ID
  grp_name: String,
  prj_name: String,
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' // List of students in the team
  }],
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide', // Guide associated with the team
  }
});

const TeamModel = mongoose.model('Team', TeamSchema);
module.exports = TeamModel;
