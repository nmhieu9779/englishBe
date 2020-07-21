const mongoose = require("mongoose");
const { schema } = require("./schema");

schema.pre("save", function () {
  return doStuff().then(() => doMoreStuff());
});

const Upload = mongoose.model("Upload", schema);

module.exports = Upload;
