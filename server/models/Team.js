const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  grp_no: { type: Number, unique: true }, 
  grp_name: String,

  gd_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide' 
  }],
  prj_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects', 
  },
  students: [{ // Ensure students array is populated
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const TeamModel = mongoose.model('Teams', TeamSchema);
module.exports = TeamModel;
