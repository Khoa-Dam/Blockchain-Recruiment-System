const express = require("express");
const { getAllJob, createJob } = require("../controllers/apiJobs");

const routerAPIJobs = express.Router();

// Lấy tất cả jobs
routerAPIJobs.get("/jobs", getAllJob);

// Tạo job mới
routerAPIJobs.post("/jobs/create-job", createJob);

module.exports = routerAPIJobs;
