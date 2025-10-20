const express = require("express");
const connection = require("./src/config/database");
const routerAPIJobs = require("./src/routers/JobRouters");
const cors = require("cors"); // Import cors
const routerAPIApply = require("./src/routers/applicationRoutes");
const app = express();
const port = process.env.PORT || 8888; //port => hardcode . uat .prod
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

app.use(
  cors({
    origin: "http://localhost:3000", // Chỉ cho phép origin này
    methods: ["GET", "POST"], // Các phương thức được phép
    credentials: true, // Nếu bạn cần gửi cookie hoặc thông tin xác thực
  })
);

app.use("/api", routerAPIJobs);
app.use("/api", routerAPIApply);

(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
