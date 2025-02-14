const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  role: { type: String, required: true },
  isOpen: { type: Boolean, default: true },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
