const mongoose = require("mongoose");
const { schema, logsSchema } = require("./schema");

const FileManager = mongoose.model("FileManager", schema);
const Logs = mongoose.model("Logs", logsSchema);

module.exports = { FileManager, Logs };
