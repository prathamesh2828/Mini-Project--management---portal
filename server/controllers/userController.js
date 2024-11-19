const GuideModel = require("../models/Guide");
const StudentModel = require("../models/Student");

exports.getUserProfile = (req, res) => {
  const { userId, role } = req.body;

  const model = role === 'guide' ? GuideModel : StudentModel;

  model.findById(userId)
    .then(user => {
      if (user) {
        res.json({ status: "Success", user });
      } else {
        res.json({ status: "Error", message: "User not found" });
      }
    })
    .catch(err => res.json({ status: "Error", message: err.message }));
};
