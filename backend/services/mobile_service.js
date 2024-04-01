const dotenv = require("dotenv");
dotenv.config();

const client = require("twilio")(
  process.env.TWELLO_ACC_ID,
  process.env.TWELLO_TOKEN
);

module.exports.sendOtpMobile = async () => {
  const response = await client.verify.v2
    .services(process.env.TWELLO_VERIFY_SID)
    .verifications.create({ to: "+917385815109", channel: "sms" })
    .then((verification) => {
      console.log(verification.status);
      console.log(verification);
    });
  return response;
};

module.exports.verifyOtpMobile = async (otp) => {
  let response = await client.verify.v2
    .services(process.env.TWELLO_VERIFY_SID)
    .verificationChecks.create({ to: "+917385815109", code: otp })
    .then((verification_check) => {
      console.log(verification_check);
      //   response = verification_check;
      return verification_check.valid;
    });

  return response;
};
