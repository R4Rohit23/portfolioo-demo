const mongoose = require("mongoose");

const paymentDetailsSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  payment_date: { type: Date, default: Date.now },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  email: { type: String, required: true},
  // artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
  // projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  // paymentMethod: { type: String, required: true },
  razorpay_payment_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_signature: { type: String, required: true },
});

const Payment = mongoose.model("Payment", paymentDetailsSchema);

module.exports = Payment;
