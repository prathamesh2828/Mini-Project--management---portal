const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  std_id :Number,
  name: String,
  email: { type: String, unique: true }, // Ensure email is unique
  password: String,
  role: { type: String, default: 'student' }, // Default role for Student
  grp_no: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teams', // Reference to the Team they belong to
  },
  class: String,
  div: String
});

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;
