const mongoose = require("mongoose");
const Constants = require("../configs.json").CONSTANTS;

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    message: { type: String, required: true },
    priority: { type: Boolean, default: false },
    client_id: {
      type: String,
      required: true,
    },
    artist_id: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["Accepted", "Rejected", "Pending"],
      default: "Pending",
    },
    isSeen: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  Constants.DB_COLLECTIONS.MESSAGE,
  messageSchema
);
