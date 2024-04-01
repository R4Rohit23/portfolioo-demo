const CommonUtils = require("../utils/common");
const DBUtils = require("../utils/db_operations");
const DBService = require("../services/mongodb");
const Configs = require("../configs.json");

const databaseObject = new DBService();
const DB_COLLECTIONS = Configs.CONSTANTS.DB_COLLECTIONS;

const createArtist = async (req, res) => {
    try {
        const email = req.user?.email;
        const userId = req.user?.id;

        const keysToExtract = [
            "title",
            "description",
            "location",
            "pricing",
            "systemAvailability",
            "skills",
            "socialLinks",
        ];

        const newObj = await CommonUtils.extractKeysFromRequestBody(
            req.body,
            keysToExtract
        );

        // Check 1:- If User is not registered
        const user = await DBUtils.findOne(
            { email },
            databaseObject,
            DB_COLLECTIONS.USERS
        );

        if (!user) {
            return res.status(400).json({ error: "Email is not registered" });
        }

        // Check 2:- If User is Client
        const isClient = await DBUtils.findOne(
            { email },
            databaseObject,
            DB_COLLECTIONS.CLIENT
        );

        if (isClient) {
            return res.status(400).json({
                error: `${email} is already  registered as a client`,
            });
        }

        const newArtist = await DBUtils.create(
            { ...newObj, userId, email },
            databaseObject,
            DB_COLLECTIONS.ARTIST
        );

        console.log("newArtist", newArtist);
        await DBUtils.updateOne(
            { email },
            { accountType: "Artist", artistId: newArtist._id },
            false,
            databaseObject,
            DB_COLLECTIONS.USERS
        );

        res.status(200).json({
            message: `Artist created successfully with email ${email}`,
            data: newArtist,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllArtists = async (req, res) => {
    const filter = req?.body?.filter ? req.body.filter : {};
    const sort = req?.body?.sort ? req.body.sort : { createdAt: -1 };
    const limit = req?.body?.limit ? req.body.limit : 5;
    const page = req?.body?.page ? req.body.page : 1;
    const skip = (page - 1) * limit;

    try {
        const pipeline = [
            {
                $match: { ...filter },
            },
            {
                $sort: sort,
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                    pipeline: [
                        {
                            $project: {
                                firstName: 1,
                                lastName: 1,
                                email: 1,
                                username: 1,
                                profileImage: 1,
                                isAdminVerified: 1,
                                _id: 0,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: "$user",
            },
            {
                $sort: { createdAt: -1 },
            },
        ];

        const artists = await DBUtils.aggregate(
            pipeline,
            databaseObject,
            DB_COLLECTIONS.ARTIST
        );
        console.log("Executing aggregation [getAllUsers]: ", pipeline);
        res.status(200).json({ success: true, data: artists });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getArtistByUserId = async (req, res) => {
    try {
        const userId = req.user.id;

        console.log(userId);

        const artist = await DBUtils.findOne(
            { userId },
            databaseObject,
            DB_COLLECTIONS.ARTIST
        );

        if (!artist) {
            console.log("Artist not found");
            return res.status(404).json({
                success: false,
                message: "Artist not found for the given user ID",
            });
        }

        res.json(artist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateArtist = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is available in req.user
        const { email } = req.user;

        // Ensure that the user exists before attempting to update
        const existingArtist = await DBUtils.findOne(
            { userId: userId },
            databaseObject,
            DB_COLLECTIONS.ARTIST
        );

        console.log("exitingArtist", existingArtist);

        if (!existingArtist) {
            return res.status(404).json({
                error: "Artist not found for the given user ID",
            });
        }

        // Update fields from the request body
        const keys = [
            "emergencyContactNumber",
            "contactNumber",
            "socialLinks",
            "availability",
            "pricing",
            "workLocation",
            "isAvailable",
            "location",
            "languageKnown",
            "systemAvailability",
            "paymentTerm",
            "workingHoursPerDay",
            "softwareUsed",
            "technologyBackground",
            "certification",
            "clientRatings",
            "paymentMethods",
            "preferredPaymentTerms",
            "skills",
            "isVerifiedByAdmin",
            "title",
            "description",
            "profileImage",
            "coverImage",
            "educationInfo",
        ];

        let payload = {};
        for (const key of keys) {
            const value = req.body[[key]];

            if (value) {
                if (key == "educationInfo") {
                    payload[key] = [...existingArtist[key], value];
                }
                if (key == "skills") {
                    payload[key] = [...existingArtist[key], ...value];
                } else payload[key] = value;
            }
        }

        // Add any additional validation or processing logic here if needed

        const result = await DBUtils.updateOne(
            { userId: userId },
            payload,
            false,
            databaseObject,
            DB_COLLECTIONS.ARTIST
        );

        const user = await DBUtils.findOne(
            { email: email },
            databaseObject,
            DB_COLLECTIONS.USERS,
            undefined,
            `Email ${req.user.email} is not registered.`
        );

        if (user?.artistId) {
            const artist = await DBUtils.findOne(
                { userId: userId },
                databaseObject,
                DB_COLLECTIONS.ARTIST
            );
            user["artistId"] = artist;
        }

        console.log(result);
        return res.status(200).json({
            success: true,
            user: user,
            message: "Artist updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createArtist,
    getArtistByUserId,
    updateArtist,
    getAllArtists,
};
