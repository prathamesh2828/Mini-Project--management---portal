const TeamModel = require("../models/Team");

exports.createTeam = async (req, res) => {
  const { grp_no, grp_name, prj_id, gd_id, students } = req.body;

  try {
    const newTeam = new TeamModel({ grp_no, grp_name, prj_id, gd_id, students });
    await newTeam.save();
    res.status(201).json({ status: "Success", team: newTeam });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

exports.getTeamsByGuide = async (req, res) => {
  const { gd_id } = req.params;

  try {
    const teams = await TeamModel.find({ gd_id }).populate("students").exec();

    if (teams.length === 0) {
      res.json({ status: "Success", message: "No teams found for this guide." });
    } else {
      res.json({ status: "Success", teams });
    }
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};


exports.getTeamByGroup = async (req, res) => {
  const { grp_no } = req.params;

  try {
    const team = await TeamModel.findOne({ grp_no }).populate("students").exec();

    if (!team) {
      res.json({ status: "Success", message: "No team found for this group number." });
    } else {
      res.json({ status: "Success", team });
    }
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};