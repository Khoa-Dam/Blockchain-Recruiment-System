const Application = require("../model/Application");
const mongoose = require("mongoose");

// Hàm nộp đơn xin việc
const applyJob = async (req, res) => {
  const { jobId, walletAddress } = req.body;

  try {
    const newApplication = new Application({ jobId, walletAddress });
    await newApplication.save();
    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting application", error });
  }
};

// Hàm lấy tất cả các đơn xin việc
const getAllApply = async (req, res) => {
  let results = await Application.find({});

  return res.status(200).json({
    errorcode: 0,
    data: results,
  });
};

// Kiểm tra xem đã nộp đơn cho job chưa
// const checkJobApplication = async (req, res) => {
//   const { jobId, walletAddress } = req.params;

//   try {
//     // Convert jobId to ObjectId
//     const application = await Application.findOne({
//       jobId: mongoose.Types.ObjectId(jobId),
//       walletAddress,
//     });

//     console.log("check has apply:", application);

//     if (application) {
//       return res.status(200).json({ applied: true, application });
//     } else {
//       return res.status(200).json({ applied: false });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error checking application", error });
//   }
// };

const checkJobApplication = async (req, res) => {
  const { jobId, walletAddress } = req.params;
  console.log("Received request:", { jobId, walletAddress });

  try {
    // Kiểm tra jobId có phải ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid jobId" });
    }

    // Tìm kiếm đơn ứng tuyển
    const application = await Application.findOne({
      jobId: new mongoose.Types.ObjectId(jobId), // Chuyển đổi jobId đúng cách
      walletAddress,
    });

    console.log("Application found:", application);

    return res.status(200).json({ applied: !!application, application });
  } catch (error) {
    console.error("Error checking application:", error); // Log lỗi chi tiết
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Hàm lấy danh sách wallet addresses đã apply cho job
const getWalletAddressesByJobId = async (req, res) => {
  const { jobId } = req.query; // Get jobId from query parameters

  try {
    const applications = await Application.find({
      jobId: new mongoose.Types.ObjectId(jobId),
    });
    const walletAddresses = applications.map((app) => app.walletAddress); // Extract wallet addresses

    return res.status(200).json({
      errorcode: 0,
      walletAddresses,
    });
  } catch (error) {
    console.log("check err getwallet: ", error);
    return res
      .status(500)
      .json({ message: "Error retrieving applications", error });
  }
};

// Export all functions
module.exports = {
  applyJob,
  getAllApply,
  checkJobApplication,
  getWalletAddressesByJobId,
};
