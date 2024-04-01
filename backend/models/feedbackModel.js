const mongoose = require('mongoose');

// Define the Feedback schema
const feedbackSchema = new mongoose.Schema({
  feedbackId: { type: String, required: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String },
  category: { type: String },
  rating: { type: Number },
  attachmentUrls: { type: [String] },
});

// Create a Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
