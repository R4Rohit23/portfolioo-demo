module.exports.validateRequestBody = async (body, keys) => {
  try {
    let missingKeys = ``;
    let payload = {};

    for (const key of keys) {
      const value = body[[key]];
      console.log(key, value, missingKeys);
      if (!value) {
        if (missingKeys === ``) {
          missingKeys = key;
        } else {
          missingKeys += `, ${key}`;
        }
      } else {
        payload[key] = value;
      }
    }

    if (missingKeys.length) {
      throw new Error(`Missing fields in input are - ${missingKeys}`);
    }

    console.log(`Processed payload - ${JSON.stringify(payload)}`);
    return payload;
  } catch (error) {
    console.log(
      `Error occured validating request body - ${JSON.stringify(
        body
      )}, keys - ${JSON.stringify(keys)} & error - ${error}`
    );
    throw error;
  }
};

module.exports.extractKeysFromRequestBody = (body, keys) => {
  try {
    const extractedKeys = {};

    for (const key of keys) {
      const value = body[key];
      extractedKeys[key] = value !== undefined ? value : undefined;
    }

    console.log(`Extracted keys - ${JSON.stringify(extractedKeys)}`);
    return extractedKeys;
  } catch (error) {
    console.log(
      `Error occurred extracting keys from request body - ${JSON.stringify(
        body
      )}, keys - ${JSON.stringify(keys)} & error - ${error}`
    );
    throw error;
  }
};

module.exports.generateRandomOtp = (length) => {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return Math.floor(min + Math.random() * (max - min + 1));
};

module.exports.isWithinTimeWindow = (updatedAtEp, allowedTimeWindow) => {
  const currentTimeEp = Math.floor(Date.now() / 1000);
  const timeDifference = currentTimeEp - updatedAtEp;
  console.log(
    `Time Difference in secs - ${timeDifference}, ${currentTimeEp}, ${updatedAtEp}`
  );

  return timeDifference > allowedTimeWindow;
};

module.exports.sendOtpEmailTemplate = (otp, otpType) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Email</title>
</head>
<body style="background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
        <h2 style="background-color: #FAD02E; color: black; padding: 10px; border-radius: 5px; max-width: 200px; margin: 15px auto;">Portfoliooo</h2>
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">OTP Verification Email</div>
        <div style="font-size: 16px; margin-bottom: 20px;">
            <p>Dear User,</p>
            <p>Thank you for registering with Portfoliooo. To complete your registration, please use the following OTP (one-time password) to verify your account:</p>
            <h2 style="font-weight: bold;">${otp}</h2>
            <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard it. Once your account is verified, you will have access to our platform and its features.</p>
        </div>
        <div style="font-size: 14px; color: #999999; margin-top: 20px;">
            If you have any questions or need assistance, please feel free to reach out to Portfoliooo <a href="mailto:contact@blackcheriemedia.com">here</a>. We are here to help!
        </div>
    </div>
</body>
</html>

`;

module.exports.passwordResetEmailTemplate = (url) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Link </title>
  </head>
  <body style="background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
        <h2 style="background-color: #FAD02E; color: black; padding: 10px; border-radius: 5px; max-width: 200px; margin: 15px auto;">Portfoliooo</h2>
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Password Reset Link</div>
          <div style="font-size: 16px; margin-bottom: 20px;">
              <p>Dear User,</p>
              <p>Thank you for registering with Portfoliooo. Use the following link to reset your password:</p>
              <h2 style="font-weight: bold;">
                 <a style="display: inline-block; padding: 10px 20px; background-color: #ffd60a; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 20px;" href="${url}">Click Me</a>
              </h2>
              <p>This link is valid for 5 minutes. If you did not request this Verification, you are not able to reset your password.</p>
          </div>
          <div style="font-size: 14px; color: #999999; margin-top: 20px;">
            If you have any questions or need assistance, please feel free to reach out to Portfoliooo <a href="mailto:contact@blackcheriemedia.com">here</a>. We are here to help!
          </div>
      </div>
  </body>
  </html>`;
};

module.exports.checkIfElementExistsInArray = (element, array) => {
  const ind = array.findIndex((obj) => {
    return obj === element;
  });

  if (ind == -1) return false;
  return true;
};

module.exports.getPainationConfigs = (obj) => {
  const page = obj?.page ? obj.page : 1;
  const limit = obj?.limit ? obj.limit : 25;
  const skip = (page - 1) * limit;

  return { skip, limit };
};
