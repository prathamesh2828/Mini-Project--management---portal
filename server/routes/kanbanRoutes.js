const express = require("express");
const { addKanban, getKanbans, updateTaskStatus } = require("../controllers/kanbanController");

const router = express.Router();

// Route to get all kanban tasks
router.get("/kanbans", getKanbans);

// Route to update task status
router.put("/kanbans", updateTaskStatus);

// Route to add a new kanban task
router.post("/kanbans", addKanban);

module.exports = router;
