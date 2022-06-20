const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// routes
// app.use("/", require("./routes"));
app.use("/transfers", require("./routes/transfers"));
app.use("/erc20balance", require("./routes/erc20Balance"));
app.use("/nativebalance", require("./routes/nativeBalance"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

module.exports = app;
