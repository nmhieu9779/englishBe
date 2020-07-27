const express = require("express");
const router = express.Router();

router.use("/file-manager", require("../src/controller/file-manager"));

module.exports = router;
