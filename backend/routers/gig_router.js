const express = require("express");
const router = express.Router();
const gigController = require("../controllers/gig-controller");
const authentication = require("../middleware/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const path = require("path");

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

router.post(
  "/create-gig",
  authentication.auth,
  // authentication.isClient,
  upload.fields([{ name: "mediaFiles", maxCount: 10 }]),
  gigController.createGig
);

router.post("/getAllGigs", gigController.getAllGigs);

router.post("/getGigById", gigController.getGigById);

router.put(
  "/updateGig",
  authentication.auth,
  authentication.isClient,
  gigController.updateGig
);

module.exports = router;
