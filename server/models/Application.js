const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    matchScore: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
      default: 'Applied'
    },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);