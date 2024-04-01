const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dasboard/dashboard");
const authentication = require("../middleware/auth");

// Registration endpoint
// Route for creating a new artist
router.post("/suggest-location", dashboardController.suggestLocation);

module.exports = router;
