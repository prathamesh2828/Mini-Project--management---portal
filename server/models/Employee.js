const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String, // 'guide' or 'student'
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team', // Reference to the Team they belong to
  },
});

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);
module.exports = EmployeeModel;
