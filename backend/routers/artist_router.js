const express = require("express");
const router = express.Router();

const artistController = require("../controllers/artistController");
const authentication = require("../middleware/auth");

// Registration endpoint
router.get("/", function (req, res) {
  res.send("Welcome to the artist Routes");
});

// Route for creating a new artist
router.post(
  "/onboardArtist",
  authentication.auth,
  artistController.createArtist
);

router.post("/getAllArtists", artistController.getAllArtists);

router.get(
  "/getArtist",
  authentication.auth,
  authentication.isArtist,
  artistController.getArtistByUserId
);

router.put(
  "/updateArtist",
  authentication.auth,
  authentication.isArtist,
  artistController.updateArtist
);

module.exports = router;
