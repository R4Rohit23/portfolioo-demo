const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authentication = require("../middleware/auth");

// Registration endpoint
router.get("/", function (req, res) {
  res.send("Welcome to the admin Routes");
});

router.get(
  "/getAllUsers",
  adminController.getAllUsers
);

router.put(
    "/updateAdmin" ,
    adminController.updateUserById
)

router.delete(
    "/deleteAdmin" ,
    adminController.deleteUserById
)

router.post("/loginAdmin", adminController.adminLoginHandler);

module.exports = router;
