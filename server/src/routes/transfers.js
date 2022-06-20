const express = require("express");
const router = express.Router();
const { transfersController } = require("../controller/userController");

router.get("/:address", transfersController);

module.exports = router;
