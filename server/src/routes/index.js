const express = require("express");
const router = express.Router();
const fact = require("./fact");
router.get("/facts", fact);
module.exports = router;
