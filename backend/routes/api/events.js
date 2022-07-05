const express = require("express");
const {
  Event,
  Group,
  Venue,
  User,
  EventAttendee,
  GroupMember,
} = require("../../db/models");

const { check } = require("express-validator");
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

//Delete attendance to an event specified by id
//NEED TO WORK ON IT, GETTING DESTROY IS NOT A FUNCTION??
// router.delete(
//   "/:eventId/attendees/:attendeeId",
//   requireAuth,
//   async (req, res) => {
//     const eventAttendee = EventAttendee.findOne({
//       where: {
//         eventId: req.params.eventId,
//         userId: req.params.attendeeId,
//       },
//     });

//     const event = await Event.findByPk(req.params.eventId);

//     if (!event) {
//       res.status(404);
//       res.json({
//         message: "Event couldn't be found",
//         statusCode: 404,
//       });
//     }

//     const groupId = event.dataValues.groupId;

//     const group = await Group.findByPk(groupId);

//     const currUser = req.user;
//     let currUserId = currUser.dataValues.id;

//     if (
//       group.dataValues.organizerId === currUserId ||
//       currUserId === req.params.attendeeId
//     ) {
//       console.log(eventAttendee);
//       await eventAttendee.destroy();
//       res.json({
//         message: "Successfully deleted attendance from event",
//       });
//     } else {
//       res.json({
//         message: "You do not have the valid permissions",
//       });
//     }
//   }
// );

//Get all attendees of an event specified by id
router.get("/:eventId/attendees", async (req, res) => {
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

  const groupMemberStatus = groupMember.dataValues.status;

  if (
    group.dataValues.organizerId === currUserId ||
    groupMemberStatus === "co-host"
  ) {
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
      userId: currUserId,
      eventId: req.params.eventId,
    },
  });

  console.log(eventAttendee);

  if (eventAttendee && eventAttendee.dataValues.status === "pending") {
    res.status(400);
    return res.json({
      message: "Attendance has already been requested",
      statusCode: 400,
    });
  }

  if (
    eventAttendee &&
    (eventAttendee.dataValues.status === "member" ||
      eventAttendee.dataValues.status === "co-host")
  ) {
    res.status(400);
    res.json({
      message: "User is already an attendee of the event",
      statusCode: 400,
    });
  }

  const eventIdNumerical = Number(req.params.eventId);

  const newEventAttendee = await EventAttendee.create({
    userId: currUserId,
    eventId: eventIdNumerical,
  });

  let result = newEventAttendee.toJSON();
  delete result.EventId;
  delete result.UserId;
  delete result.createdAt;
  delete result.updatedAt;
  res.json(result);
});

//Change the status of an attendance for an event specified by id
//NEED TO FIX, NOT SAVING THE UPDATE IN THE TABLE
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

  // need to add co-host logic
  if (group.dataValues.organizerId !== currUserId) {
    res.status(403);
    res.json({
      message:
        "You are not an owner of this group, you do are not authorized to change the status",
    });
  }

  let { userId, status } = req.body;

  const eventAttendee = await EventAttendee.findOne({
    where: {
      userId: userId,
      eventId: req.params.eventId,
    },
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

  // console.log(eventAttendee);

  // console.log(eventAttendee.dataValues.status);

  eventAttendee.dataValues.status = status;
  await eventAttendee.save;

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
    where: { eventId: id },
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

  const groupMemberStatus = groupMember.dataValues.status;

  console.log(groupMemberStatus);

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

//route handler for getting all events, need to add venues association to not be nested later
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
