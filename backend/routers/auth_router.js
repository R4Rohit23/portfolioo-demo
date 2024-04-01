const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth/authHandlers");
const path = require("path");
const middleware = require("../middleware/auth");
const authentication = require("../middleware/auth");
const passport = require("../utils/google_stratergy");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpeg|jpg|png|webp/;
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

router.post("/login", auth.loginHandler);
router.post(
    "/register",
    upload.fields([{ name: "profileImage", maxCount: 1 }]),
    auth.registerHandler
);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: process.env.GOOGLE_UI_FAILURE_REDIRECT_URL,
    }),
    auth.googleHandler
);

router.post("/register-client", middleware.auth, auth.registerClient);
router.post("/send-otp", auth.sendOtp);
router.post("/reset-password", auth.resetPassword);
router.post("/forgot-password-token", auth.createResetPasswordToken);
router.put("/change-password", auth.resetPassword);

module.exports = router;
