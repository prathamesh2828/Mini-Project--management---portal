const express = require("express");
const router = express.Router();
const GuideModel = require("../models/Guide");
const StudentModel = require("../models/Student");

router.post("/", (req, res) => {
  const { email, password, role } = req.body;
  const model = role === 'guide' ? GuideModel : StudentModel;

  model.findOne({ email }).then((user) => {
    if (user && user.password === password) {
      const dashboard = role === 'guide' ? '/guide-dashboard' : '/student-dashboard';
      res.json({ status: "Success", user, dashboard });
    } else {
      res.json({ status: "Error", message: "Invalid email or password" });
    }
  }).catch(err => res.json({ status: "Error", message: err.message }));
});

module.exports = router;
