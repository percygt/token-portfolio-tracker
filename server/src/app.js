const express = require("express");
const app = express();
const middleware = require("./routes");
app.use("/api", middleware);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
module.exports = app;
