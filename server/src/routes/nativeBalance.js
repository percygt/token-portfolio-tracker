const express = require("express");
const router = express.Router();
const { nativeBalanceController } = require("../controller/userController");

router.get("/:address", nativeBalanceController);

module.exports = router;
