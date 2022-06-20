require("dotenv").config();
const app = require("./app");
const config = require("./config/config.json");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const env = process.env.NODE_ENV;
const configration = config[env];

connectDB();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT || configration.port, () => {
    console.log(`Server running on port ${configration.port}`);
  });
});
