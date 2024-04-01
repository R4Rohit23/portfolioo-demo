const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile/profileHandler");
const authentication = require("../middleware/auth");
const path = require("path");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpeg|jpg|png/;
        const extname = allowedFileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = allowedFileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(
                new Error(
                    "Invalid file type. Only JPEG, JPG, and PNG files are allowed."
                )
            );
        }
    },
});

router.get("/my-profile", authentication?.auth, profileController?.myProfile);
router.put(
    "/update-password",
    authentication?.auth,
    profileController?.updatePassword
);
router.put(
    "/update-profile",
    upload.fields([{ name: "profileImage", maxCount: 1 }]),
    authentication?.auth,
    profileController?.updateProfile
);

module.exports = router;
