const mongoose = require("mongoose");
const { schema } = require("./schema");

schema.pre("save", function () {
  return doStuff().then(() => doMoreStuff());
});

const FileManager = mongoose.model("FileManager", schema);

module.exports = FileManager;
