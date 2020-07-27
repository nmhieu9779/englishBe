const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  filename: {
    type: String,
    required: [true],
  },
  createdAt: {
    type: Date,
  },
  createdBy: {
    type: String,
  },
  fileUrl: {
    type: String,
    required: [true],
  },
});
module.exports = { schema };
