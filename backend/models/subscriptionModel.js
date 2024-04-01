const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  autoRenewal: { type: Boolean, default: true },
  status: { type: String, default: 'Active' },
  paymentDetailsId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentDetails' }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;