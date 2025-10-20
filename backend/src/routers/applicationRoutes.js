const express = require("express");

const {
  applyJob,

  getAllApply,

  checkJobApplication,

  getWalletAddressesByJobId,
} = require("../controllers/apiApplycation");

const routerAPIApply = express.Router();

// Nộp đơn xin việc

routerAPIApply.post("/apply/job", applyJob);

routerAPIApply.get("/apply", getAllApply);

// Kiểm tra xem đã nộp đơn cho job chưa
routerAPIApply.get(
  "/check-application/:jobId/:walletAddress",

  checkJobApplication
);

// Lấy danh sách wallet addresses đã apply cho job
routerAPIApply.get("/applications", getWalletAddressesByJobId);

module.exports = routerAPIApply;
