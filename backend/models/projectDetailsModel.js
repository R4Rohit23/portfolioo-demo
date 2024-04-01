const mongoose = require('mongoose');

const projectDetailsSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  skills_required: { type: [String] },
  budget: { type: Number, required: true },
  deadline: { type: Date },
  status: { type: String, default: 'Pending' },
  bookmark: { type: Boolean, default: false }
});

const ProjectDetails = mongoose.model('ProjectDetails', projectDetailsSchema);

module.exports = ProjectDetails;
