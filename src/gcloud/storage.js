const { Storage } = require("@google-cloud/storage");

const storage = new Storage({ keyFilename: "./serviceAccountKey.json" });

module.exports = storage;
