const jwtService = require("../middleware/auth");
const DBService = require("../services/mongodb");
const dbUtils = require("../utils/db_operations");
const CommonUtils = require("../utils/common");
const configs = require("../configs.json");
const DATABASE_COLLECTIONS = configs.CONSTANTS.DB_COLLECTIONS;
const databaseObject = new DBService();

// Admin Login Handler
module.exports.adminLoginHandler = async (req, res) => {
  try {
    const requiredFields = ["email", "password"];
    await CommonUtils.validateRequestBody(req.body, requiredFields);

    const admin = await dbUtils.findOne(
      { email: req.body.email },
      databaseObject,
      DATABASE_COLLECTIONS.ADMIN,
      undefined,
      `${req.body.email} is not registered admin.`
    );

    if (admin.password === req.body.password) {
      const accessToken = jwtService.generateToken(
        admin.email,
        admin._id,
        "Admin",
        undefined
      );

      res.status(200).json({
        message: "Admin login successful!",
        accessToken: accessToken,
      });
    } else {
      res.status(403).json({
        error: "Invalid password for admin.",
      });
    }
  } catch (error) {
    console.log(`[adminLoginHandler] Error occurred: ${error}`);
    res.status(500).json({
      error: error.message,
    });
  }
};

// Register handler for Admin
module.exports.adminRegisterHandler = async (req, res) => {
  try {
    // Assuming DBUtils has a generic findOne method
    const admin = await DBUtils.findOne(
      { email: req.body.email },
      databaseObject,
      DB_COLLECTIONS.ADMINS
    );

    const requiredFields = [
      "email",
      "password",
      "firstName",
      "lastName",
      "username",
    ];
    const newObj = await CommonUtils.validateRequestBody(
      req.body,
      requiredFields
    );

    if (admin) {
      res.status(403).json({
        error: `${req.body.email} is already registered as an admin.`,
      });
    } else {
      const newAdmin = await DBUtils.create(
        newObj,
        databaseObject,
        DB_COLLECTIONS.ADMINS
      );

      res.status(200).json({
        message: `Admin created successfully with email - ${req.body.email}`,
        newAdmin: newAdmin,
      });
    }
  } catch (error) {
    console.log(`[adminRegisterHandler] Error occurred: ${error}`);
    res.status(400).json({
      error: error.message,
    });
  }
};
module.exports.getAllUsers = async (req, res) => {
  try {
    // Execute the find query to retrieve all users
    const users = await dbUtils.find(
      {},
      databaseObject,
      DATABASE_COLLECTIONS.USERS
    );

    // Check if any users are found
    if (users.length === 0) {
      return res
        .status(404)
        .json({ type: "Error", message: "No users found." });
    }

    // Send Success response with users
    res.status(200).json({ type: "Success", users });
  } catch (error) {
    console.error(`[getAllAllowedAdmins] Error occurred : ${error}`);
    res.status(500).json({ type: "Error", message: "Internal server error." });
  }
};

module.exports.updateUserById = async (req, res) => {
  try {
    // Extract _id from the request body
    const { _id, ...updateData } = req.body;

    const userId = dbUtils.convertStringIDToMongooseId(_id);

    // Check if _id is provided
    if (!_id) {
      return res
        .status(400)
        .json({ type: "Error", message: "_id is required for updating user." });
    }

    // Execute the update operation
    const updateResult = await dbUtils.updateOne(
      { _id: userId },
      updateData,
      false, // Set upsertFlag to false
      databaseObject,
      DATABASE_COLLECTIONS.USERS
    );

    // Check if any document was modified
    if (!updateResult.nModified) {
      return res.status(404).json({
        type: "Error",
        message: "No user found with the provided _id.",
      });
    }

    // Send success response
    res
      .status(200)
      .json({ type: "Success", message: "User updated successfully." });
  } catch (error) {
    console.error(`[updateUserById] Error occurred : ${error}`);
    res.status(500).json({ type: "Error", message: "Internal server error." });
  }
};

module.exports.deleteUserById = async (req, res) => {
  try {
    // Extract _id from the request body
    const { _id } = req.body;

    const userId = dbUtils.convertStringIDToMongooseId(_id);

    // Check if _id is provided
    if (!_id) {
      return res
        .status(400)
        .json({ type: "Error", message: "_id is required for updating user." });
    }

    // Execute the delete operation
    const deleteResult = await dbUtils.deleteOne(
      { _id: userId },
      databaseObject,
      DATABASE_COLLECTIONS.USERS
    );

    // Check if any document was deleted
    if (!deleteResult.deletedCount) {
      return res.status(404).json({
        type: "Error",
        message: "No user found with the provided _id.",
      });
    }

    // Send success response
    res
      .status(200)
      .json({ type: "Success", message: "User deleted successfully." });
  } catch (error) {
    console.error(`[deleteUserById] Error occurred : ${error}`);
    res.status(500).json({ type: "Error", message: "Internal server error." });
  }
};
