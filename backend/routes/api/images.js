const express = require("express");

const {
  User,
  Group,
  GroupMember,
  Image,
  EventAttendee,
  Event,
} = require("../../db/models");

const router = express.Router();

// router.delete("/:imageId", requireAuth, async (req, res) => {
//   const image = await Image.findByPk(req.params.imageId);

//   const currUser = req.user;
//   let currUserId = currUser.dataValues.id;

//   let imageableType;

//   if (image.eventId) imageableType = "Event";
//   else imageableType = "Group";

//   let group;
//   let event;

//   if (imageableType === "Event") {
//     event = await Event.findByPk(image.eventId);
//   } else {
//     group = await Group.findByPk(image.groupId);
//   }

//   if (group) {
//     const ownerId = group.dataValues.organizerId;
//     if (ownerId !== currUserId) {
//       res.status(403);
//       res.json({
//         message: "You do not have permission to delete this image",
//       });
//     }
//     await image.destroy();

//   }

//   if (event) {
//   }

//   res.json(image);
// });

module.exports = router;
