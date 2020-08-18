const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  fileName: {
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
  note: {
    type: String,
  },
});

const logsSchema = new Schema({
  createdAt: {
    type: Date,
  },
  message: {
    type: String,
  },
});

module.exports = { schema, logsSchema };
