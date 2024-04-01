const DBService = require("../../services/mongodb");
const S3Utils = require("../../utils/s3");
const DBUtils = require("../../utils/db_operations");
const CommonUtils = require("../../utils/common");
const Configs = require("../../configs.json");
const dotenv = require("dotenv");
const crypto = require("crypto");
const EmailService = require("../../services/email_service");
const jwtService = require("../../middleware/auth");
const JWT = require("jsonwebtoken");
const Twello = require("../../services/mobile_service");

dotenv.config();
const databaseObject = new DBService();
const DB_COLLECTIONS = Configs.CONSTANTS.DB_COLLECTIONS;

module.exports.sendOtp = async (req, res) => {
    try {
        const requiredFields = ["email"];
        const { email } = await CommonUtils.validateRequestBody(
            req.body,
            requiredFields
        );

        const user = await DBUtils.findOne(
            { email: email },
            databaseObject,
            DB_COLLECTIONS.USERS,
            undefined
        );

        if (user) {
            return res.status(403).json({
                error: `${req.body.email} is already registered.`,
                message: `${req.body.email} is already registered.`,
            });
        }

        // generate otp
        const otpNumber = CommonUtils.generateRandomOtp(Configs.OTP_LENGTH);

        const newOtp = await DBUtils.create(
            {
                email: email,
                otp: otpNumber,
            },
            databaseObject,
            DB_COLLECTIONS.OTPS
        );

        // await Twello.sendOtpMobile();

        res.status(200).json({
            message: `OTP sent successfully for - ${email}`,
        });
    } catch (error) {
        res.status(400).json({
            error: `${error.message}`,
        });
    }
};

module.exports.loginHandler = async (req, res) => {
    try {
        const requiredFields = ["email", "password"];
        const { password, email } = await CommonUtils.validateRequestBody(
            req.body,
            requiredFields
        );

        const user = await DBUtils.findOne(
            { email: req.body.email },
            databaseObject,
            DB_COLLECTIONS.USERS,
            undefined,
            `Email ${req.body.email} is not registered.`
        );

        console.log("login user data ", user);

        // const isPasswordCorrect = await bcrypt.compare(
        //   req.body.password,
        //   user.password
        // );

        let accessToken = null;
        if (password === user?.password) {
            accessToken = jwtService.generateToken(
                user.email,
                user._id,
                user.accountType,
                user.username
            );

            res.status(200).json({
                message: "Login Successfully!",
                accessToken: accessToken,
            });
        } else {
            res.status(403).json({
                error: "Invalid password.",
            });
        }
    } catch (error) {
        console.log(`[loginHandler] Error occurred: ${error}`);
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports.registerHandler = async (req, res) => {
    try {
        console.log("req", req.body);
        const user = await DBUtils.findOne(
            { email: req.body.email },
            databaseObject,
            DB_COLLECTIONS.USERS
        );

        const requiredFields = [
            "email",
            "password",
            "confirmPassword",
            "firstName",
            "lastName",
            "username",
            "otp",
        ];

        const newObj = await CommonUtils.validateRequestBody(
            req.body,
            requiredFields
        );

        if (newObj?.password !== newObj?.confirmPassword) {
            return res.status(408).json({
                error: `password and confirm password not match `,
            });
        }

        // Email verification code
        const pipline = [
            {
                $match: {
                    email: newObj.email,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $limit: 1,
            },
        ];

        const checkOtp = await DBUtils.aggregate(
            pipline,
            databaseObject,
            DB_COLLECTIONS.OTPS
        );
        console.log("otpt ", checkOtp);

        if (!checkOtp?.length) {
            return res.status(408).json({
                error: ` Otp is expired .`,
                message: "Otp expired",
            });
        }
        if (checkOtp[0]?.otp !== newObj.otp) {
            return res.status(403).json({
                error: `Otp not matched`,
                message: "Otp not matched",
            });
        }

        if (user) {
            return res.status(403).json({
                error: `${req.body.email} is already registred.`,
            });
        } else {
            // mobile verification
            // const verifiedOtp = await Twello.verifyOtpMobile(newObj.otp);
            // if (!verifiedOtp) {
            //   return res.status(408).json({
            //     error: `wrong otp`,
            //     message: "wrong otp",
            //   });
            // }
            const images = await uploadImages(req.files, req.body.email);
            console.log("uploaded imgaes", images);

            // Todo
            // const hashedPassword = await bcrypt.hash(newObj.password, 10);

            const newUser = await DBUtils.create(
                { ...newObj, ...images },
                databaseObject,
                DB_COLLECTIONS.USERS
            );

            console.log("user", newUser);
            const accessToken = jwtService.generateToken(
                newObj?.email,
                newUser?._id,
                newUser?.username
            );

            console.log(`New user - ${JSON.stringify(newUser)}`);

            return res.status(200).json({
                message: `user created successfully with email - ${req.body.email}`,
                accessToken: accessToken,
                email: newUser?.email,
            });
        }
    } catch (error) {
        console.log(`[register] Error occured : ${error}`);
        if (error.message.includes("username_1 dup key")) {
            error.message = `Username is already taken.`;
        }
        res.status(400).json({
            error: error.message,
        });
    }
};

module.exports.registerClient = async (req, res) => {
    try {
        const email = req.user?.email;
        const userId = req.user?.id;
        const requiredFields = [
            "companyOrganization",
            "industry",
            "preferredWorkingHours",
            "location",
        ];
        const newObj = await CommonUtils.validateRequestBody(
            req.body,
            requiredFields
        );

        const user = await DBUtils.findOne(
            { email: email },
            databaseObject,
            DB_COLLECTIONS.USERS
        );

        if (!user) {
            return res.status(400).json({
                error: `${email} is not registered to a platform`,
            });
        }

        const isArtist = await DBUtils.findOne(
            { email: email },
            databaseObject,
            DB_COLLECTIONS.ARTIST
        );

        if (isArtist) {
            return res.status(400).json({
                error: `${email} is  registered as a Artist`,
            });
        }

        const isClient = await DBUtils.findOne(
            { email: email },
            databaseObject,
            DB_COLLECTIONS.CLIENT
        );

        if (isClient) {
            return res.status(400).json({
                error: `${email} is already  registered as a client`,
            });
        }

        console.log("new obj ", newObj);

        const newClient = await DBUtils.create(
            { ...newObj, userId, email: req.user.email },
            databaseObject,
            DB_COLLECTIONS.CLIENT
        );

        await DBUtils.updateOne(
            { email },
            {
                accountType: Configs.CONSTANTS.client,
                clientId: newClient._id,
            },
            false,
            databaseObject,
            DB_COLLECTIONS.USERS,
            `${email} is not registered.`
        );

        return res.status(200).json({
            message: `user created successfully with email - ${req.user.email}`,
            user: newClient,
        });
    } catch (error) {
        console.log(`[register] Error occured : ${error}`);

        res.status(400).json({
            error: error.message,
        });
    }
};

module.exports.resetPassword = async (req, res) => {
    try {
        const requiredFields = ["email", "otp", "newPassword"];
        const { email, otp, newPassword } =
            await CommonUtils.validateRequestBody(req.body, requiredFields);

        // Check if the user with the provided email exists
        const user = await DBUtils.findOne(
            { email },
            databaseObject,
            DB_COLLECTIONS.USERS,
            undefined,
            `${email} is not already registered.`
        );

        // Assuming 'forgot password' is the first type
        const otpType = Configs.OTP_TYPES[0];
        const savedOtp = await DBUtils.findOne(
            { userId: user._id, otpType },
            databaseObject,
            DB_COLLECTIONS.OTPS,
            undefined,
            "Invalid OTP or Email provided."
        );

        if (savedOtp.isUsed) {
            throw new Error(
                `Previous OTP has been already used, Please generate new one to conitinue.`
            );
        }

        const isOtpExpired = CommonUtils.isWithinTimeWindow(
            savedOtp.updatedAtEP,
            Configs.OTP_EXPIRATION_TIMEOUT_IN_SECS
        );

        if (isOtpExpired) {
            throw new Error(`OTP Expired, Please generate new one to proceed.`);
        }

        if (savedOtp.otpNumber === otp) {
            // Update user's password (assuming password is stored as plain text)
            await DBUtils.updateOne(
                { _id: user._id },
                { password: newPassword },
                false,
                databaseObject,
                DB_COLLECTIONS.USERS
            );

            // Mark the OTP as used
            await DBUtils.updateOne(
                { _id: savedOtp._id },
                { isUsed: true },
                false,
                databaseObject,
                DB_COLLECTIONS.OTPS
            );

            res.status(200).json({
                message: `Password reset successfully for - ${email}`,
            });
        } else {
            res.status(400).json({
                error: `Wrong OTP Provided`,
            });
        }
    } catch (error) {
        res.status(400).json({
            error: `${error.message}`,
        });
    }
};

module.exports.googleHandler = async (req, res) => {
    try {
        console.log(`Google profile - ${JSON.stringify(req.user)}`);
        console.log("google user ", req.user);
        const password = req.user.id;
        const email = req.user.emails[0].value;
        const username = req.query.username
            ? req.query.username
            : req.user.emails[0].value;
        const firstName = req.user.name.givenName;
        const lastName = req.user.name.familyName;

        // console.log("user name ", req?.query);

        const profileImage = req.user.photos[0].value;

        let user = await DBUtils.findOne(
            { email: email },
            databaseObject,
            DB_COLLECTIONS.USERS
        );
        if (user) {
            // user already exists, provide hime accessToken directly
            const accessToken = jwtService.generateToken(
                user.email,
                user._id,
                user.accountType,
                user.username
            );
            // res.cookie("accessToken", accessToken, { httpOnly: true });
            res.redirect(
                `${process.env.GOOGLE_UI_SUCCESS_REDIRECT_URL}?token=${accessToken}`
            );
        } else {
            // register user for him first
            user = await DBUtils.create(
                {
                    email,
                    password,
                    firstName,
                    lastName,
                    profileImage,
                    username,
                },
                databaseObject,
                DB_COLLECTIONS.USERS
            );

            const accessToken = jwtService.generateToken(
                user.email,
                user._id,
                user.accountType,
                user.username
            );
            // res.cookie("accessToken", accessToken, { httpOnly: true });
            res.redirect(
                `${process.env.GOOGLE_UI_SUCCESS_REDIRECT_URL}?token=${accessToken}`
            );
        }
    } catch (error) {
        console.log(`[googleHandler] Error occurred: ${error}`);
        res.redirect(process.env.GOOGLE_UI_FAILURE_REDIRECT_URL);
    }
};

module.exports.createResetPasswordToken = async (req, res) => {
    try {
        const requiredFields = ["email"];
        const { email } = await CommonUtils.validateRequestBody(
            req.body,
            requiredFields
        );

        const user = await DBUtils.findOne(
            { email: req.body.email },
            databaseObject,
            DB_COLLECTIONS.USERS,
            "User not registered"
        );

        // creating unique token
        const token = crypto.randomBytes(20).toString("hex");
        // await uuid();

        const addToken = await DBUtils.updateOne(
            { email: email },
            {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 60 * 1000,
            },
            false,
            databaseObject,
            DB_COLLECTIONS.USERS,
            "Failed to add reset password token in user database "
        );

        const url = `${process.env.FRONTEND_URL}/update-password/${token}`;
        const html = CommonUtils.passwordResetEmailTemplate(url);
        const emailSubject = "Portfolioo Update Password";
        const emailText = null;

        await EmailService.sendMail(email, emailSubject, emailText, html);

        return res.status(200).json({
            success: true,
            massage: "reset password token created",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            massage: "Failed to reset password ",
        });
    }
};

module.exports.resetPassword = async (req, res) => {
    try {
        const requiredFields = ["password", "token", "confirmPassword"];
        const { password, token, confirmPassword } =
            await CommonUtils.validateRequestBody(req.body, requiredFields);

        const user = await DBUtils.findOne(
            { resetPasswordToken: token },
            databaseObject,
            DB_COLLECTIONS.USERS
        );

        console.log("user ", user);
        // check date is expired or not
        if (new Date(user.resetPasswordExpires) < Date.now()) {
            return res.status(408).json({
                success: false,
                massage: "Token is expired. Regenerate ",
            });
        }

        if (password !== confirmPassword) {
            return res.status(413).json({
                success: false,
                massage: "Password not matched",
            });
        }

        await DBUtils?.updateOne(
            { resetPasswordToken: token },
            { password: password },
            false,
            databaseObject,
            DB_COLLECTIONS.USERS,
            "Failed to update password"
        );

        // send response
        return res.status(200).json({
            success: true,
            massage: "password reset",
        });
    } catch (error) {
        console.log(error);
        return res.status(413).json({
            success: false,
            massage: "Token not matched",
        });
    }
};

async function uploadImages(files, email) {
    const uploadedImages = {};

    if (files && files.profileImage) {
        const fileKey = `${email}-professional-profile.jpeg`;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: files.profileImage[0].buffer,
            ContentType: files.profileImage[0].mimetype,
        };
        const uploadResult = await S3Utils.uploadFileToS3(params);
        uploadedImages.profileImage = uploadResult.Location;
    }

    return uploadedImages;
}
