const DBUtils = require("../utils/db_operations");
const CommonUtils = require("../utils/common");
const Configs = require("../configs.json");
const DBService = require("../services/mongodb");

const databaseObject = new DBService();
const DB_COLLECTIONS = Configs.CONSTANTS.DB_COLLECTIONS;

// Controller function to create a new message
const createMessage = async (req, res) => {
  try {
    const client_id = req.user?.id;
    const { artist_id, message, priority, isPinned } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const artist = await DBUtils.findOne(
      { userId: artist_id },
      databaseObject,
      DB_COLLECTIONS.ARTIST,
      {},
      "Artist Not Found"
    );

    // Retrieve the client 
    const client = await DBUtils.findOne(
      { userId: client_id },
      databaseObject,
      DB_COLLECTIONS.CLIENT,
      {},
      "Client not found"
    );

    // Create a new message using the Message model
    const newMessage = await DBUtils.create(
      {
        message,
        priority,
        isPinned,
        client_id,
        artist_id,
      },
      databaseObject,
      DB_COLLECTIONS.MESSAGE
    );

    client.createdMessageIds.push(newMessage._id);

    await DBUtils.updateOne(
      { userId: client_id },
      { createdMessageIds: client.createdMessageIds },
      false,
      databaseObject,
      DB_COLLECTIONS.CLIENT
    );

    artist.receivedMessageIds.push(newMessage._id);

    await DBUtils.updateOne(
      { userId: artist_id },
      { receivedMessageIds: artist.receivedMessageIds },
      true,
      databaseObject,
      DB_COLLECTIONS.ARTIST
    );

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller function to retrieve all messages
const getAllMessages = async (req, res) => {
  try {
    const { accountType } = req?.user;
    console.log("Account Type", accountType);

    const filter = req?.body?.filter ? req.body.filter : {};
    const sort = req?.body?.sort ? req.body.sort : { createdAt: -1 };
    const limit = req?.body?.limit ? req.body.limit : 5;
    const page = req?.body?.page ? req.body.page : 1;
    const skip = (page - 1) * limit;

    if (accountType === "Client") {
      const clientId = req.user?.id;
      const id = DBUtils.convertStringIDToMongooseId(clientId);

      const pipeline = [
        {
          $match: { client_id: id },
        },
        {
          $lookup: {
            from: "artists",
            localField: "artist_id",
            foreignField: "userId",
            as: "artist",
            pipeline: [
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
            ],
          },
        },
        {
          $unwind: "$artist",
        },
      ];
      const messages = await DBUtils.aggregate(
        pipeline,
        databaseObject,
        DB_COLLECTIONS.MESSAGE
      );
      // Return success response with the retrieved messages
      res.status(200).json({ success: true, data: messages });
      // for artist
    } else {
      const artistId = req.user?.id;
      console.log("Artist Id", artistId);
      const pipeline = [
        {
          $match: { artist_id: artistId, ...filter },
        },
        {
          $sort: sort,
        },
        {
          $lookup: {
            from: "clients",
            let: { searchId: { $toObjectId: "$client_id" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$userId", "$$searchId"] },
                },
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
            ],
            as: "client",
          },
        },
        {
          $unwind: "$client",
        },
      ];

      const messages = await DBUtils.aggregate(
        pipeline,
        databaseObject,
        DB_COLLECTIONS.MESSAGE
      );

      // Return success response with the retrieved messages
      res.status(200).json({ success: true, data: messages });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateInvite = async (req, res) => {
  try {
    const artistId = req.user?.id;

    const keysToExtract = ["inviteId", "state", "isPinned", "isSeen"];

    const newObj = await CommonUtils.extractKeysFromRequestBody(
      req.body,
      keysToExtract
    );

    const message = await DBUtils.findOne(
      { _id: newObj.inviteId },
      databaseObject,
      DB_COLLECTIONS.MESSAGE
    );

    // if (message.state === "Accepted") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You can not modify the accepted invite",
    //   });
    // }

    if (artistId !== message.artist_id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to update this invite",
      });
    }

    await DBUtils.updateOne(
      { _id: newObj.inviteId },
      { ...newObj },
      false,
      databaseObject,
      DB_COLLECTIONS.MESSAGE
    );

    res.status(200).json({
      success: true,
      message: "Invite updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const searchMessages = async (req, res) => {
  try {
    const { state } = req.query; // Get the state parameter from the query string

    if (!state) {
      return res.status(400).json({ success: false, message: "State parameter is required" });
    }

    const pipeline = [
      {
        $match: { state: state },
      },
    ];

    const messages = await DBUtils.aggregate(
      pipeline,
      databaseObject, // Assuming DBService creates a new connection object
      DB_COLLECTIONS.MESSAGE
    );

    // Return success response with the retrieved messages
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const getAllMessagesSortedByCreatedAt = async (req, res) => {
  try {
    const { accountType } = req?.user;
    console.log("Account Type", accountType);

    let sortOrder = req.query.sortOrder === 'asc' ? 1 : -1; // Default to descending order if sortOrder is not provided or invalid

    if (accountType === "Client") {
      const clientId = req.user?.id;
      const id = DBUtils.convertStringIDToMongooseId(clientId);

      const pipeline = [
        {
          $match: { client_id: id },
        },
        {
          $lookup: {
            from: "artists",
            localField: "artist_id",
            foreignField: "userId",
            as: "artist",
            pipeline: [
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
            ],
          },
        },
        {
          $unwind: "$artist",
        },
        {
          $sort: { createdAt: sortOrder } // Sort by createdAt field with the specified sortOrder
        }
      ];
      const messages = await DBUtils.aggregate(
        pipeline,
        databaseObject,
        DB_COLLECTIONS.MESSAGE
      );
      // Return success response with the retrieved messages
      res.status(200).json({ success: true, data: messages });
      // for artist
    } else {
      // Handle sorting for artist here, if needed
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



module.exports = {
  createMessage,
  getAllMessages,
  updateInvite,
  searchMessages,
  getAllMessagesSortedByCreatedAt
};
