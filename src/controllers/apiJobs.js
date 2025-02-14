const Job = require("../model/Job");

const getAllJob = async (req, res) => {
  let results = await Job.find({});

  return res.status(200).json({
    errorcode: 0,
    data: results,
  });
};

const createJob = async (req, res) => {
  const job = new Job(req.body);
  try {
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllJob,
  createJob,
};
