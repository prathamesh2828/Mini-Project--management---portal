const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const TeamModel = require("../models/Team");


router.get("/teams/:grp_no", teamController.getTeamByGroup);

// Get teams by guide ID
router.get("/:gd_id", async (req, res) => {
  const { gd_id } = req.params;

  try {
    const teams = await TeamModel.find({ gd_id })
      .populate("students", "name email") // Populate student details
      .exec();

    if (teams.length === 0) {
      return res.json({ status: "Error", message: "No teams found for this guide." });
    }

    res.json({ status: "Success", teams });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
});

module.exports = router;
