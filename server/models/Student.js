const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  std_id: { type: Number, unique: true, required: true, default: () => Math.floor(Math.random() * 10000) }, // Auto-generate a random ID
  name: String,
  email: { type: String, unique: true }, 
  password: String,
  role: { type: String, default: 'student' },
  grp_no: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, 
  class: String,
  div: String,
  prj_name :String,
  description:String
});

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;
