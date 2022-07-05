const express = require("express");

const { Group, User, Venue, Event, GroupMember } = require("../../db/models");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const router = express.Router();

// Validates create group data
const validateCreateGroup = [
  check("name")
    .isLength({ max: 60 })
    .withMessage("Name must be 60 characters or less"),
  check("about")
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more"),
  check("type").custom((type) => {
    console.log(type === "In person");
    if (type !== "Online" && type !== "In person") {
      console.log("in here");
      return Promise.reject("Type must be Online or In person");
    } else return true;
  }),
  check("private").isBoolean().withMessage("Private must be a boolean"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  handleValidationErrors,
];

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

// Change the status of a membership for a group specified by id
// NEED TO FIX

router.put("/:groupId/members", requireAuth, async (req, res) => {
  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  const group = await Group.findByPk(req.params.groupId);

  if (!group) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  let { memberId, status } = req.body;

  const groupMember = await GroupMember.findOne({
    where: {
      GroupId: req.params.groupId,
      UserId: memberId,
    },
    attributes: ["id", "GroupId", "UserId", "status"],
  });

  if (!groupMember) {
    res.status(404);
    res.json({
      message: "Membership between the user and the group does not exits",
      statusCode: 404,
    });
  }

  groupMemberStatus = groupMember.dataValues.status;

  // console.log(groupMemberStatus);

  const ownerId = group.dataValues.organizerId;

  if (currUserId !== ownerId && status === "co-host") {
    res.status(403);
    res.json({
      message: "Current User must be the organizer to add a co-host",
      statusCode: 403,
    });
  }

  if (
    currUserId !== ownerId &&
    groupMemberStatus !== "co-host" &&
    status === "member"
  ) {
    res.status(400);
    res.json({
      message:
        "Current User must be the organizer or a co-host to make someone a member",
      statusCode: 400,
    });
  }

  if (status === "pending") {
    res.status(400);
    res.json({
      message: "Cannot change a membership status to pending",
      statusCode: 400,
    });
  }

  // groupMember.dataValues.status = status;
  // await groupMember.save;

  await groupMember.update({
    status,
  });

  let result = groupMember;

  res.json(result);
});

//Delete membership to a group
//NEED TO FIX
router.delete("/:groupId/members/:memberId", requireAuth, async (req, res) => {
  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  const group = await Group.findByPk(req.params.groupId);

  if (!group) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  const ownerId = group.dataValues.organizerId;

  if (currUserId !== req.params.memberId && currUserId !== ownerId) {
    res.status(403);
    res.json({
      message: "Only the User or organizer may delete a Membership",
      statusCode: 403,
    });
  }

  const groupMember = await GroupMember.findOne({
    where: {
      GroupId: req.params.groupId,
      UserId: req.params.memberId,
    },
  });

  if (!groupMember) {
    res.status(404);
    res.json({
      message: "Membership does not exist for this User",
      statusCode: 404,
    });
  }

  console.log(groupMember);
  await groupMember.destroy();

  res.json({
    message: "Successfully deleted membership from group",
  });
});

// Find a groups members
router.get("/:groupId/members", async (req, res) => {
  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  const group = await Group.findByPk(req.params.groupId);

  if (!group) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  const ownerId = group.dataValues.organizerId;

  let members;

  if (ownerId === currUserId) {
    members = await Group.findByPk(req.params.groupId, {
      include: {
        model: User,
        as: "Members",
        through: {
          attributes: ["status"],
          as: "Membership",
        },
      },
      attributes: [],
    });
  } else {
    members = await Group.findByPk(req.params.groupId, {
      include: {
        model: User,
        as: "Members",
        through: {
          attributes: ["status"],
          where: { status: { [Op.not]: "pending" } },
          as: "Membership",
        },
      },
      attributes: [],
    });
  }

  res.json(members);
});

//Request membership for a group based on group
//Not finished, random GroupId and Userid popping up
router.post("/:groupId/members", requireAuth, async (req, res) => {
  const group = await Group.findByPk(req.params.groupId);

  if (!group) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  let requestedMember = await GroupMember.findOne({
    where: {
      GroupId: req.params.groupId,
      UserId: currUserId,
      status: "pending",
    },
  });

  if (requestedMember) {
    res.status(400);
    res.json({
      message: "Membership has already been requested",
      statusCode: 400,
    });
  }

  let alreadyMember = await GroupMember.findOne({
    where: {
      GroupId: req.params.groupId,
      UserId: currUserId,
      status: "member",
    },
  });

  if (alreadyMember) {
    res.status(400);
    res.json({
      message: "User is already a member of the group",
      statusCode: 400,
    });
  }

  let groupIdNumerical = Number(req.params.groupId);

  let newMember = await GroupMember.create({
    GroupId: groupIdNumerical,
    UserId: currUserId,
  });

  let result = newMember.toJSON();
  // delete result.GroupId;
  // delete result.UserId;
  delete result.createdAt;
  delete result.updatedAt;

  res.json(result);
});

//Create a new event for a group
//end date validator needs to be fixed
//prettier-ignore
router.post("/:groupId/events", requireAuth,  validateCreateEvent, async (req, res, next) => {
    const group = await Group.findByPk(req.params.groupId);

    if (!group) {
      res.status(404);
      res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

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
      const err = new Error("Validation Error");
      err.status = 400;
      err.errors = { venueId: "Venue does not exist" };
      return next(err);
    }

    const event = await Event.create({
      groupId: req.params.groupId,
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
    delete result.updatedAt;
    delete result.createdAt;

    res.json(result);
  }
);

//Create a new venue for a group specified by its id
// prettier-ignore
router.post("/:groupId/venues", validateCreateVenue, requireAuth, async (req, res) => {
    const group = await Group.findByPk(req.params.groupId);

    if (!group) {
      res.status(404)
      res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    const currUser = req.user;
    let currUserId = currUser.dataValues.id;

    if (group.dataValues.organizerId !== currUserId) {
      res.status(403);
      res.json({
        message:
          "You are not an owner of this group, you do are not authorized to create a venue",
        statusCode: 403,
      });
    }

    const { address, city, state, lat, lng } = req.body;

    const venue = await Venue.create({
      groupId: req.params.groupId,
      address,
      city,
      state,
      lat,
      lng,
    });

    let result = venue;

    delete result.dataValues.createdAt;
    delete result.dataValues.updatedAt;

    res.json(result);
  }
);

//Get group details of a specific group by groupId
router.get("/:groupId", async (req, res) => {
  // Need to add images array association
  let group = await Group.findByPk(req.params.groupId, {
    attributes: { exclude: ["previewImage"] },
    include: {
      model: User,
      as: "Organizer",
    },
  });

  if (!group) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  let { id } = group;
  const numMembers = await GroupMember.count({
    where: { groupId: id },
  });
  group.dataValues.numMembers = numMembers;

  res.json(group);
});

//Edit a group, validate the req body, check that the user owns the group
router.put("/:groupId", requireAuth, validateCreateGroup, async (req, res) => {
  const group = await Group.findByPk(req.params.groupId);

  if (!group) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  if (group.dataValues.organizerId !== currUserId) {
    res.status(403);
    res.json({
      message: "Group does not belong to you",
      statusCode: 403,
    });
  }

  let { name, about, type, private, city, state } = req.body;

  await group.update({
    name,
    about,
    type,
    private,
    city,
    state,
  });

  const { numMembers, previewImage, ...groupToSend } = group.dataValues;

  res.send(groupToSend);
});

//Delete a group
//NEED TO FIX
router.delete("/:groupId", requireAuth, async (req, res) => {
  const group = await Group.findByPk(req.params.groupId);

  if (!group) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  const currUser = req.user;
  let currUserId = currUser.dataValues.id;

  if (group.dataValues.organizerId !== currUserId) {
    res.status(403);
    res.json({
      message: "Group does not belong to you",
      statusCode: 403,
    });
  }

  console.log(group);

  await group.destroy();

  res.send({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

//Get all groups
router.get("/", async (req, res) => {
  let groups = await Group.findAll();

  for (let group of groups) {
    let { id } = group;
    const numMembers = await GroupMember.count({
      where: { groupId: id },
    });
    group.dataValues.numMembers = numMembers;
  }

  res.json({ Groups: groups });
});

//Create a group
router.post("/", requireAuth, validateCreateGroup, async (req, res, next) => {
  let { name, about, type, private, city, state } = req.body;

  let currentUserId = req.user.dataValues.id;

  const group = await Group.create({
    organizerId: currentUserId,
    name,
    about,
    type,
    private,
    city,
    state,
  });

  res.send(group);
});

module.exports = router;
