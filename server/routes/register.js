const express = require("express");
const router = express.Router();
const GuideModel = require("../models/Guide");
const StudentModel = require("../models/Student");

router.post("/", (req, res) => {
  const { role, ...userData } = req.body;
  const model = role === 'guide' ? GuideModel : StudentModel;

  model.create(userData)
    .then((user) => res.json({ status: "Success", user }))
    .catch((err) => res.json({ status: "Error", message: err.message }));
});

module.exports = router;
