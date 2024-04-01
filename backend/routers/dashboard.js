const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashBoardController");
// const authentication = require("../middleware/auth");

// Registration endpoint
router.get("/", function (req, res) {
  res.send("Welcome to the dashboard Routes");
});

router.get(
  "/getDashboard",
  dashboardController.dashBoard
);

module.exports = router;
