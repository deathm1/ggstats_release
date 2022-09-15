const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  endPoint: {
    type: Number,
    required: true,
  },
  generateTime: {
    type: Number,
    default: Date.now,
  },
  revokeTime: {
    type: Number,
    default: Date.now,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("sharableLinks", serviceSchema);
