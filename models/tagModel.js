const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      min: 1,
      max: 30,
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'boards',
    },
    column: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("tags", TagSchema);
