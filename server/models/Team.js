const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  grp_no: { type: Number, unique: true }, 
  grp_name: { type: String, required: true },
  prj_id: { type: Number, required: true }, // Project ID stored as a number
  gd_id: { type: Number, required: true },  // Guide ID stored as a number
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Students remain as ObjectIds
});

const TeamModel = mongoose.model('Teams', TeamSchema);
module.exports = TeamModel;
