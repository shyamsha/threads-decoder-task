const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const ThreadSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  description: {
    type: String,
    minlength: 3,
    required: true,
  },
  tags: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Thread = mongoose.model("Thread", ThreadSchema);
module.exports = {
  Thread,
};
