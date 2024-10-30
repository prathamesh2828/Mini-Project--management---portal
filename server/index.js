const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mini_project_portal");

app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server is running");
});
