const storage = require("./storage");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const bucket = storage.bucket(process.env.GCL_BUCKET_NAME);

module.exports = bucket;
