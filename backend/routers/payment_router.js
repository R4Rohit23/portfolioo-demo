const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authentication = require("../middleware/auth");

router.post(
  "/checkout",
  authentication.auth,
  authentication.isClient,
  paymentController.checkout
);

router.post(
  "/paymentVerification",
  authentication.auth,
  authentication.isClient,
  paymentController.paymentVerification
);

// send the razorpay api key
router.get("/getKey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY });
});

module.exports = router;
