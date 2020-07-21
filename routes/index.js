const express = require("express");
const router = express.Router();

router.use("/upload", require("../src/controller/upload"));

module.exports = router;
