require("dotenv").config();
const mongoose = require("mongoose");

const dbState = [
  { value: 0, label: "Disconnected" },
  { value: 1, label: "Connected" },
  { value: 2, label: "Connecting" },
  { value: 3, label: "Disconnecting" },
  { value: 99, label: "Uninitialized" },
];

const connection = async () => {
  try {
    const uri = process.env.DB_HOST.replace(
      "<db_password>",
      process.env.DB_PASSWORD
    );

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, options);

    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value === state).label, "to database");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

module.exports = connection;
