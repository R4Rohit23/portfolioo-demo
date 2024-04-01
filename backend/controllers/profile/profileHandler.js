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
const bcrypt = require("bcrypt");
const User = require("../../models/User");

dotenv.config();
const databaseObject = new DBService();
const DB_COLLECTIONS = Configs.CONSTANTS.DB_COLLECTIONS;

module.exports.myProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { email } = req.user;

        databaseObject.connect();
        console.log(
            `Executing findQuerry - ${JSON.stringify(req.user.email)} over User`
        );

        console.log(userId);
        console.log(email);
        const user = await DBUtils.findOne(
            { email: email },
            databaseObject,
            DB_COLLECTIONS.USERS,
            undefined,
            `Email ${req.body.email} is not registered.`
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: `${req.user?.email}  not registered `,
            });
        }

        console.log("user data", user);
        if (user?.clientId) {
            const client = await DBUtils.findOne(
                { userId: userId },
                databaseObject,
                DB_COLLECTIONS.CLIENT
            );
            user["clientId"] = client;
        }
        if (user?.artistId) {
            const artist = await DBUtils.findOne(
                { userId: userId },
                databaseObject,
                DB_COLLECTIONS.ARTIST
            );
            user["artistId"] = artist;
        }

        return res.status(200).json({
            user: user,
        });
    } catch (error) {
        console.log(`[register] Error occured : ${error}`);
        return res.status(404).json({
            message: "Failed to Fetch user data  ",
            error: `${req.user?.email}  not registered `,
        });
    }
};

module.exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is available in req.user

        // Ensure that the user exists before attempting to update
        const existingUser = await DBUtils.findOne(
            { _id: userId },
            databaseObject,
            DB_COLLECTIONS.USERS
        );

        if (!existingUser) {
            return res.status(404).json({
                error: "User not found for the given user ID",
            });
        }

        // Update fields from the request body
        const keys = [
            "firstName",
            "lastName",
            "location",
            "dob",
            "gender",
            "phoneNumber",
        ];

        let payload = {};
        for (const key of keys) {
            const value = req.body[[key]];

            if (value) {
                payload[key] = value;
            }
        }

        // Add any additional validation or processing logic here if needed
        const images = await uploadImages(req.files, req.user.email);
        console.log("uploaded imgaes", images);

        await DBUtils.updateOne(
            { _id: userId },
            { ...payload, ...images },
            false,
            databaseObject,
            DB_COLLECTIONS.USERS,
            "Failed to update profile"
        );

        const result = await User.findOne({ _id: userId })
            .select("-password")
            .populate("clientId")
            .populate("artistId");

        console.log(result);
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.updatePassword = async (req, res) => {
    try {
        const requiredFields = ["password", "newPassword"];
        const { password, newPassword } = await CommonUtils.validateRequestBody(
            req.body,
            requiredFields
        );

        const userId = req.user.id;
        const user = await DBUtils.findOne(
            { _id: userId },
            databaseObject,
            DB_COLLECTIONS.USERS
        );

        console.log("user ", user);

        if (password !== user?.password) {
            return res.status(413).json({
                success: false,
                error: "Old Password not matched",
                message: "Old Password not matched",
            });
        }

        await DBUtils?.updateOne(
            { _id: userId },
            { password: newPassword },
            false,
            databaseObject,
            DB_COLLECTIONS.USERS,
            "Failed to update password"
        );

        // send response
        return res.status(200).json({
            success: true,
            message: "password updated",
        });
    } catch (error) {
        console.log(error);
        return res.status(413).json({
            success: false,
            message: "Failed to Update",
            error: "Failed to Update",
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
