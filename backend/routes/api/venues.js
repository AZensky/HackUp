const express = require("express");
const { Event, Group, Venue } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.put("/:venueId", requireAuth, async (req, res) => {
  let venue = await Venue.findByPk(req.params.venueId, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  if (!venue) {
    res.status(404);
    res.json({
      message: "Venue couldn't be found",
      statusCode: 404,
    });
  }

  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  const group = await Group.findByPk(venue.dataValues.groupId);

  if (group.dataValues.organizerId !== currUserId) {
    res.status(403);
    res.json({
      message:
        "You are not an owner of this group, you do are not authorized to create a venue",
      statusCode: 403,
    });
  }

  const { address, city, state, lat, lng } = req.body;

  await venue.update({
    address,
    city,
    state,
    lat,
    lng,
  });

  res.json(venue);
});

module.exports = router;
