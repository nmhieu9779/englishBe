const express = require("express");
const router = express.Router();

router.use("/file-manager", require("./file-manager"));

module.exports = router;
