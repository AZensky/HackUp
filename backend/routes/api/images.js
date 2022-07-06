const express = require("express");
const { requireAuth } = require("../../utils/auth");

const {
  User,
  Group,
  GroupMember,
  Image,
  EventAttendee,
  Event,
} = require("../../db/models");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
  const image = await Image.findByPk(req.params.imageId);

  if (!image) {
    res.status(404);
    res.json({
      message: "Image couldn't be found",
    });
  }

  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  if (currUserId !== image.userId) {
    res.status(403);
    return res.json({
      message: "Image does not belong to you",
    });
  }

  await image.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
