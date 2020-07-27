const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", require("./get"));
router.post("/create", upload.single("image"), require("./create"));
router.get("/download", require("./download"));

module.exports = router;
