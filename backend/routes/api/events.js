const express = require("express");
const { Event, Group, Venue } = require("../../db/models");

const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//Validation checks for creating an event
const validateCreateEvent = [
  check("name")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters"),
  check("type").custom((type) => {
    if (type !== "Online" && type !== "In person") {
      return Promise.reject("Type must be Online or In person");
    } else return true;
  }),
  // prettier-ignore
  check("capacity")
  .isInt()
  .withMessage("Capacity must be an integer"),
  // prettier-ignore
  check("price")
  .isDecimal({ min: 0 })
  .withMessage("Price is invalid"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("startDate")
    .isAfter(new Date().toString())
    .withMessage("Start date must be in the future"),
  //need to add validation for end date
  // check("endDate").isAfter(req.params.startDate),
  handleValidationErrors,
];

//Get an event by Id
router.get("/:eventId", async (req, res) => {
  const event = await Event.findByPk(req.params.eventId, {
    attributes: { exclude: ["previewImage", "createdAt", "updatedAt"] },
    include: {
      model: Group,
      attributes: ["id", "name", "private", "city", "state"],
    },
  });

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  res.json(event);
});

router.put("/:eventId", requireAuth, validateCreateEvent, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const groupId = event.dataValues.groupId;

  const group = await Group.findByPk(groupId);

  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  //need to add cohost logic
  if (group.dataValues.organizerId !== currUserId) {
    res.status(403);
    res.json({
      message:
        "You are not an owner of this group, you do are not authorized to create an event",
      statusCode: 403,
    });
  }

  const {
    venueId,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate,
  } = req.body;

  const venue = await Venue.findByPk(venueId);

  if (!venue) {
    res.status(404);
    res.json({
      message: "Venue couldn't be found",
      statusCode: 404,
    });
  }

  await event.update({
    venueId,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate,
  });

  res.json(event);
});

//route handler to delete an event
router.delete("/:eventId", async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  await event.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

//route handler for getting all events, need to add venues association later
router.get("/", async (req, res) => {
  const events = await Event.findAll({
    include: {
      model: Group,
      attributes: ["id", "name", "city", "state"],
      include: {
        model: Venue,
        attributes: ["id", "city", "state"],
      },
    },
  });

  res.json({ Events: events });
});

module.exports = router;
