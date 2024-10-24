const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Ensure email is unique
  password: String,
  role: { type: String, default: 'student' }, // Default role for Student
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team', // Reference to the Team they belong to
  },
  class: String,
  div: String,
  grp_no: Number
});

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;
