const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const FileManagerController = require("../src/controller/file-manager");

router.get("/", FileManagerController.get);
router.post("/create", upload.single("image"), FileManagerController.create);
router.get("/download", FileManagerController.download);
router.get("/logs", FileManagerController.logs);

module.exports = router;
