const DBUtils = require("../utils/db_operations");
const DBService = require("../services/mongodb");
const Configs = require("../configs.json");
const { uploadImages } = require("../utils/imagesUploader");
const CommonUtils = require("../utils/common");
const databaseObject = new DBService();
const DB_COLLECTIONS = Configs.CONSTANTS.DB_COLLECTIONS;
const Gig = require("../models/Gig");

const createGig = async (req, res) => {
  const clientId = req.user?.id;
  const clientEmail = req.user?.email;

  try {
    const keysToExtract = [
      "title",
      "description",
      "fixedBudget",
      "hourlyBudgetRange",
      "skillsRequired",
      "deadline",
      "status",
      "jobLevel",
      "scopeOfWork",
    ];

    const newObj = await CommonUtils.extractKeysFromRequestBody(
      req.body,
      keysToExtract
    );

    const mediaFiles = await uploadImages(req.files, clientEmail);

    const newGig = await DBUtils.create(
      { ...newObj, ...mediaFiles, clientId },
      databaseObject,
      DB_COLLECTIONS.GIGS
    );

    res.status(200).json({
      success: true,
      message: "Gig Created Successfully",
      data: newGig,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getGigById = async (req, res) => {
  try {
    const gigId = req.body.id;
    const gig = await DBUtils.findOne(
      { _id: gigId },
      databaseObject,
      DB_COLLECTIONS.GIGS
    );
    res.status(200).json({ success: true, data: gig });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// pass any type of filters here
const getAllGigs = async (req, res) => {
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
          from: "clients",
          localField: "clientId",
          foreignField: "userId",
          as: "client",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails",
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
              $unwind: "$userDetails",
            },
          ],
        },
      },
      {
        $unwind: "$client",
      },
      {
        $sort: { createdAt: -1 },
      },
    ];

    const artists = await DBUtils.aggregate(
      pipeline,
      databaseObject,
      DB_COLLECTIONS.GIGS
    );
    console.log("Executing aggregation [getAllGigs]: ", pipeline);
    res.status(200).json({ success: true, data: artists });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateGig = async (req, res) => {
  try {
    const id = req.user.id;
    const gigId = req.body.id;

    const foundGig = await DBUtils.findOne(
      { _id: gigId },
      databaseObject,
      DB_COLLECTIONS.GIGS
    );

    // if gig is not found
    if (!foundGig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }

    // checking the user
    if (id !== foundGig.clientId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to update this gig",
      });
    }

    if (foundGig.draft === false) {
      return res.status(400).json({
        success: false,
        message: "Published Gigs are not updatable",
      });
    }

    let mediaFiles;

    if (req.files) {
      mediaFiles = await uploadImages(req.files, req.user.email);
    }

    const keysToExtract = [
      "title",
      "description",
      "fixedBudget",
      "hourlyBudgetRange",
      "skillsRequired",
      "deadline",
      "status",
      "jobLevel",
      "scopeOfWork",
      "mediaFiles",
    ];

    const newObj = await CommonUtils.extractKeysFromRequestBody(
      req.body,
      keysToExtract
    );

    const updatedGig = await DBUtils.updateOne(
      { _id: gigId },
      {
        ...newObj,
        ...mediaFiles,
      },
      false,
      databaseObject,
      DB_COLLECTIONS.GIGS,
      "Failed to update gig"
    );
    res.status(200).json({ success: true, data: updatedGig });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createGig,
  getGigById,
  getAllGigs,
  updateGig,
};
