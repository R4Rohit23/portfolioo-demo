const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const authentication = require("../middleware/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const path = require("path");

// Route for creating a new artist
// router.post('/onboardClient', jwtService.validateJwt, clientController.createClient);

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      const allowedFileTypes = /jpeg|jpg|png|/;
      const extname = allowedFileTypes.test(
          path.extname(file.originalname).toLowerCase()
      );
      const mimetype = allowedFileTypes.test(file.mimetype);
      if (mimetype && extname) {
          return cb(null, true);
      } else {
          cb(
              new Error(
                  "Invalid file type. Only JPEG, JPG, PNG and video files are allowed."
              )
          );
      }
  },
});

router.post("/onboardClient", authentication.auth, clientController.registerClient);

router.get(
  "/getClient",
  authentication.auth,
  authentication.isClient,
  clientController.getClientByUserId
);

router.put(
  "/updateClient",
  authentication.auth,
  authentication.isClient,
  clientController.updateClient
);

module.exports = router;
