const DBUtils = require("../utils/db_operations");
const CommonUtils = require("../utils/common");
const Configs = require("../configs.json");
const DBService = require("../services/mongodb");
const razorpayInstance = require("../services/razorpay");
const crypto = require("crypto");

const databaseObject = new DBService();
const DB_COLLECTIONS = Configs.CONSTANTS.DB_COLLECTIONS;

const checkout = async (req, res) => {
  const requiredFields = ["amount"];
  const newObj = await CommonUtils.validateRequestBody(
    req.body,
    requiredFields
  );

  const options = {
    amount: Number(newObj.amount * 100),
    currency: "INR",
  };

  const order = await razorpayInstance.orders.create(options);

  res.status(200).json({
    success: true,
    message: "Order created successfully",
    order: order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount } =
    req.body;

  const { email, id } = req.user;

  const generated_signature = razorpay_order_id + "|" + razorpay_payment_id;

  const expected_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(generated_signature.toString())
    .digest("hex");

  if (expected_signature == razorpay_signature) {
    console.log("Payment verified successfully");

    await DBUtils.create(
      {
        email,
        clientId: id,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        amount
      },
      databaseObject,
      Configs.CONSTANTS.DB_COLLECTIONS.PAYMENT
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    console.log("Payment verification failed");
    res.redirect(
      `${process.env.FRONTEND_URL}/paymentFailed?reference=${razorpay_payment_id}`
    );
  }
};

module.exports = { checkout, paymentVerification };
