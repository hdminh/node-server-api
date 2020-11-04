const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    created: {
      type: Date,
      default: Date.now
    },
  }
);

module.exports = mongoose.model("boards", boardSchema);