const express = require("express");
const { Event, Group, Venue, GroupMember } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//Validation checks for creating a venue
const validateCreateVenue = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  // prettier-ignore
  check("city")
  .exists({ checkFalsy: true })
  .withMessage("City is required"),
  // prettier-ignore
  check("state")
  .exists({ checkFalsy: true })
  .withMessage("State is required"),
  check("lat").custom((lat) => {
    if (lat < -90 || lat > 90) {
      throw new Error("Latitude is not valid");
    } else return true;
  }),
  check("lng").custom((lng) => {
    if (lng < -180 || lng > 180) {
      throw new Error("Longitude is not valid");
    } else return true;
  }),
  handleValidationErrors,
];

//Edit a venue specified by its id
router.put("/:venueId", requireAuth, validateCreateVenue, async (req, res) => {
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

  const groupId = venue.dataValues.groupId;

  const group = await Group.findByPk(groupId);

  const groupMember = await GroupMember.findOne({
    where: {
      GroupId: groupId,
      UserId: currUserId,
    },
  });

  const groupMemberStatus = groupMember.dataValues.status;

  if (
    group.dataValues.organizerId !== currUserId &&
    groupMemberStatus !== "co-host"
  ) {
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

  let result = venue.toJSON();
  delete result.updatedAt;

  res.json(result);
});

// Get all venues

router.get("/", async (req, res) => {
  let venues = await Venue.findAll();

  res.json(venues);
});

module.exports = router;
