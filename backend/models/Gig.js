const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    fixedBudget: {
      type: Number,
    },
    hourlyBudgetRange: {
      type: String
    },
    skillsRequired: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["InProgress", "Completed"],
      default: "InProgress",
    },
    projectRequirements: {
      type: [String],
    },
    mediaFiles: {
      type: [String],
    },
    scopeOfWork: {
      type: String,
    },
    jobLevel: {
      type: String,
    },
    deadline: {
      type: String,
    },
    draft: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Gig = mongoose.model("Gig", gigSchema);

module.exports = Gig;
