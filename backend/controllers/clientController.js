const DBUtils = require("../utils/db_operations");
const DBService = require("../services/mongodb");
const Configs = require("../configs.json");
const { uploadImages } = require("../utils/imagesUploader");
const CommonUtils = require("../utils/common");
const databaseObject = new DBService();
const DB_COLLECTIONS = Configs.CONSTANTS.DB_COLLECTIONS;
const User = require("../models/User");

const registerClient = async (req, res) => {
    try {
        const email = req.user?.email;
        const userId = req.user?.id;

        const keysToExtract = [
            "companyName",
            "companyDescription",
            "companySize",
            "industry",
            "companyWebsite",
            "companyLocation",
            "companyEmail",
            "companyPhone",
        ];

        const newObj = await CommonUtils.extractKeysFromRequestBody(
            req.body,
            keysToExtract
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
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getClientByUserId = async (req, res) => {
    try {
        const userId = req.user.id;

        console.log(userId);

        const client = await DBUtils.findOne(
            { userId },
            databaseObject,
            DB_COLLECTIONS.CLIENT
        );

        if (!client) {
            console.log("client not found");
            return res.status(404).json({
                success: false,
                message: "client not found for the given user ID",
            });
        }

        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateClient = async (req, res) => {
    try {
        const userId = req.user.id;

        const existingClient = await DBUtils.findOne(
            { userId: userId },
            databaseObject,
            DB_COLLECTIONS.CLIENT
        );

        if (!existingClient) {
            return res.status(404).json({
                error: "Client not found for the given user ID",
            });
        }

        const updateFields = req.body;

        await DBUtils.updateOne(
            { userId: userId },
            updateFields,
            false,
            databaseObject,
            DB_COLLECTIONS.CLIENT
        );

        const user = await DBUtils.findOne(
            { _id: userId },
            databaseObject,
            DB_COLLECTIONS.USERS
        );

        if (user?.clientId) {
            const client = await DBUtils.findOne(
                { userId: _id },
                databaseObject,
                DB_COLLECTIONS.CLIENT
            );
            user["clientId"] = client;
        }
        if (user?.artistId) {
            const artist = await DBUtils.findOne(
                { userId: _id },
                databaseObject,
                DB_COLLECTIONS.ARTIST
            );
            user["artistId"] = artist;
        }

        const result = await User.findOne({ _id: userId })
            .select("-password")
            .populate("clientId")
            .populate("artistId");

        return res.status(200).json({
            success: true,
            user: user,
            message: "Profile Updated",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getClientByUserId,
    updateClient,
    registerClient,
};
