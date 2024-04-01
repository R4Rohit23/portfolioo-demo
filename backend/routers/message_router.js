const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth");

const messageController = require("../controllers/messageController");
// const authentication = require("../middleware/auth");

// Registration endpoint
router.get("/", function (req, res) {
  res.send("Welcome to the message Routes");
});

router.post(
  "/createMessage",
  authentication.auth,
  authentication.isClient,
  messageController.createMessage
);

router.post(
  "/getMessage",
  authentication.auth,
  messageController.getAllMessages
);

router.put(
  "/updateInvite",
  authentication.auth,
  authentication.isArtist,
  messageController.updateInvite
);

router.get(
  "/searchMessage",
  authentication.auth,
  messageController.searchMessages 

)

// router.get(
//   "/getAllMessagesSortedByCreatedAt",
//   authentication.auth,
//   messageController.getAllMessagesSortedByCreatedAt
// );


module.exports = router;
