const express = require("express");
const {
  Event,
  Group,
  Venue,
  User,
  EventAttendee,
  GroupMember,
  Image,
} = require("../../db/models");

const { check } = require("express-validator");
const { query } = require("express-validator/check");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

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
  check("endDate").custom((value, { req }) => {
    if (value <= req.body.startDate) {
      return Promise.reject("End date must be after start date");
    } else return true;
  }),
  handleValidationErrors,
];

const validateEventsQuery = [
  query("page").custom((val) => {
    if (val < 0) {
      return Promise.reject("Page must be greater than or equal to 0");
    } else return true;
  }),
  query("size").custom((val) => {
    if (val < 0) {
      return Promise.reject("Size must be greater than or equal to 0");
    } else return true;
  }),
  query("name").custom((name) => {
    if (name === undefined) return true;
    let testForNum = Number(name);
    if (!isNaN(testForNum)) {
      return Promise.reject("Name must be a string");
    } else return true;
  }),
  query("type").custom((type) => {
    if (type === undefined) return true;
    if (type !== "Online" && type !== "In person") {
      return Promise.reject("Type must be Online or In person");
    } else return true;
  }),
  //checks for valid date time
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("startDate must be a valid datetime"),
  handleValidationErrors,
];

//Delete attendance to an event specified by id
router.delete(
  "/:eventId/attendees/:attendeeId",
  requireAuth,
  async (req, res) => {
    const eventAttendee = await EventAttendee.findOne({
      where: {
        EventId: req.params.eventId,
        UserId: req.params.attendeeId,
      },
    });

    const event = await Event.findByPk(req.params.eventId);

    if (!event) {
      res.status(404);
      res.json({
        message: "Event couldn't be found",
        statusCode: 404,
      });
    }

    if (!eventAttendee) {
      res.status(404);
      res.json({
        message: "Event Attendee does not exist",
      });
    }

    const groupId = event.dataValues.groupId;

    const group = await Group.findByPk(groupId);

    const currUser = req.user;
    let currUserId = currUser.dataValues.id;

    const groupMember = await GroupMember.findOne({
      where: {
        GroupId: groupId,
        UserId: currUserId,
      },
    });

    const groupMemberStatus = groupMember.dataValues.status;

    if (
      group.dataValues.organizerId === currUserId ||
      currUserId === req.params.attendeeId ||
      groupMemberStatus === "co-host"
    ) {
      await eventAttendee.destroy();
      res.json({
        message: "Successfully deleted attendance from event",
      });
    } else {
      res.json({
        message: "You do not have the valid permissions",
      });
    }
  }
);

//Add an Image to an Event based on the Event's id
router.post("/:eventId/images", requireAuth, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
    });
  }

  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  const eventAttendee = await EventAttendee.findOne({
    where: {
      EventId: req.params.eventId,
      UserId: currUserId,
    },
  });

  if (!eventAttendee) {
    res.status(403);
    res.json({
      message: "You are not an attendee of this event",
    });
  }
  let imageableType = "Event";

  let { url } = req.body;

  const image = await Image.create({
    url,
    userId: currUserId,
    eventId: req.params.eventId,
  });

  const result = image.toJSON();
  result.imageableId = Number(req.params.eventId);
  result.imageableType = imageableType;

  delete result.eventId;
  delete result.updatedAt;
  delete result.createdAt;
  delete result.groupId;

  res.json(result);
});

//Get all attendees of an event specified by id
router.get("/:eventId/attendees", requireAuth, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const groupId = event.groupId;

  const group = await Group.findByPk(groupId);

  const currUser = req.user;
  let currUserId = currUser.id;

  const groupMember = await GroupMember.findOne({
    where: {
      GroupId: groupId,
      UserId: currUserId,
    },
  });

  let groupMemberStatus;
  if (groupMember) groupMemberStatus = groupMember.status;

  if (group.organizerId === currUserId || groupMemberStatus === "co-host") {
    const attendees = await Event.findByPk(req.params.eventId, {
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: ["status"],
          as: "Attendance",
        },
      },
    });

    const users = attendees.Users;

    res.json({ Attendees: users });
  } else {
    const attendees = await Event.findByPk(req.params.eventId, {
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: ["status"],
          where: { status: { [Op.not]: "pending" } },
          as: "Attendance",
        },
      },
    });

    const users = attendees.Users;

    res.json({ Attendees: users });
  }
});

//Request to attend an event based on the event's id
router.post("/:eventId/attendees", requireAuth, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  const eventAttendee = await EventAttendee.findOne({
    where: {
      UserId: currUserId,
      EventId: req.params.eventId,
    },
  });

  if (eventAttendee && eventAttendee.status === "pending") {
    res.status(400);
    return res.json({
      message: "Attendance has already been requested",
      statusCode: 400,
    });
  }

  if (
    eventAttendee &&
    (eventAttendee.status === "member" || eventAttendee.status === "co-host")
  ) {
    res.status(400);
    res.json({
      message: "User is already an attendee of the event",
      statusCode: 400,
    });
  }

  const eventIdNumerical = Number(req.params.eventId);

  const newEventAttendee = await EventAttendee.create({
    UserId: currUserId,
    EventId: eventIdNumerical,
  });

  let result = newEventAttendee.toJSON();
  delete result.createdAt;
  delete result.updatedAt;
  res.json(result);
});

//Change the status of an attendance for an event specified by id
router.put("/:eventId/attendees", requireAuth, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  const groupId = event.dataValues.groupId;

  const group = await Group.findByPk(groupId);

  const groupMember = await GroupMember.findOne({
    where: {
      GroupId: groupId,
      UserId: currUserId,
    },
  });

  let groupMemberStatus;
  if (groupMember) groupMemberStatus = groupMember.dataValues.status;

  if (
    group.dataValues.organizerId !== currUserId &&
    groupMemberStatus !== "co-host"
  ) {
    res.status(403);
    res.json({
      message:
        "You are not an owner or co-host of this group, you do are not authorized to change the status",
    });
  }

  let { userId, status } = req.body;

  const eventAttendee = await EventAttendee.findOne({
    where: {
      UserId: userId,
      EventId: req.params.eventId,
    },
    attributes: { exclude: ["updatedAt", "createdAt"] },
  });

  if (!eventAttendee) {
    res.status(404);
    res.json({
      message: "Attendance between the user and the event does not exist",
      statusCode: 404,
    });
  }

  if (status === "pending") {
    res.status(400);
    res.json({
      message: "Cannot change an attendance status to pending",
      statusCode: 400,
    });
  }

  await eventAttendee.update({
    status,
  });

  res.json(eventAttendee);
});

//Get an event by Id
router.get("/:eventId", async (req, res) => {
  const event = await Event.findByPk(req.params.eventId, {
    attributes: { exclude: ["previewImage", "createdAt", "updatedAt"] },
    include: [
      {
        model: Group,
        attributes: ["id", "name", "private", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "address", "city", "state", "lat", "lng"],
      },
      {
        model: Image,
        attributes: ["url"],
      },
    ],
  });

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  let { id } = event;
  const numAttending = await EventAttendee.count({
    where: { EventId: id },
  });
  event.dataValues.numAttending = numAttending;

  res.json(event);
});

// Edit an event specified by its id
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

  const groupMember = await GroupMember.findOne({
    where: {
      GroupId: groupId,
      UserId: currUserId,
    },
  });

  let groupMemberStatus;
  if (groupMember) groupMemberStatus = groupMember.dataValues.status;

  if (
    group.dataValues.organizerId !== currUserId &&
    groupMemberStatus !== "co-host"
  ) {
    res.status(403);
    res.json({
      message:
        "You are not an organizer or a co-host of this group, you do are not authorized to edit an event",
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

  let result = event.toJSON();

  delete result.numAttending;
  delete result.previewImage;
  delete result.createdAt;
  delete result.updatedAt;

  res.json(result);
});

//route handler to delete an event
router.delete("/:eventId", requireAuth, async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const currUser = req.user;
  const currUserId = currUser.dataValues.id;

  const groupId = event.dataValues.groupId;

  const groupMember = await GroupMember.findOne({
    where: {
      GroupId: groupId,
      UserId: currUserId,
    },
  });

  const group = await Group.findByPk(groupId);

  const ownerId = group.dataValues.organizerId;

  if (currUserId !== ownerId && groupMember.dataValues.status !== "co-host") {
    res.status(403);
    res.json({
      message: "You are not the organizer or the co-host of the group",
    });
  }

  await event.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

//route handler for getting all events
router.get("/", validateEventsQuery, async (req, res) => {
  let { page, size, name, type, startDate } = req.query;

  //use page and size to determine how many and which events are displayed
  let pagination = {};

  page = page === undefined ? 1 : parseInt(page);
  size = size === undefined ? 20 : parseInt(size);

  if (isNaN(page)) page = 1;
  if (isNaN(size)) size = 2;

  if (page === 0) page = 1;

  if (page > 10) page = 10;

  if (size > 20) size = 20;

  pagination.limit = size;
  pagination.offset = size * (page - 1);

  //Implement search filters
  const where = {};

  if (name && name !== "" && name !== "undefined") {
    where.name = { [Op.substring]: name };
  }

  if (type) {
    where.type = type;
  }

  if (startDate) {
    let paramStartDate = new Date(startDate);
    where.startDate = paramStartDate;
  }

  const events = await Event.findAll({
    include: [
      {
        model: Group,
        attributes: ["id", "name", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "city", "state"],
      },
    ],
    where,
    ...pagination,
    attributes: { exclude: ["updatedAt", "createdAt"] },
  });

  for (let event of events) {
    let { id } = event;
    const numAttending = await EventAttendee.count({
      where: { EventId: id },
    });
    event.dataValues.numAttending = numAttending;
  }

  res.json({ Events: events, page: page, size: size });
});

module.exports = router;
