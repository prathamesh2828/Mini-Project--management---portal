const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Ensure email is unique
  password: String,
  role: { type: String, default: 'guide' }, // Default role for Guide
  // Additional fields specific to Guide if necessary
});

const GuideModel = mongoose.model('Guide', GuideSchema);
module.exports = GuideModel;
