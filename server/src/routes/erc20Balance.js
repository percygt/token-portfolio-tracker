const express = require("express");
const router = express.Router();
const { erc20BalanceController } = require("../controller/userController");

router.get("/:address", erc20BalanceController);

module.exports = router;
