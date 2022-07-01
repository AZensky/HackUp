const express = require("express");

const { Group } = require("../../db/models");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateCreateGroup = [
  check("name")
    .isLength({ max: 60 })
    .withMessage("Name must be 60 characters or less"),
  check("about")
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more"),
  // console.log("****"),
  // check("type").custom((type) => {
  //   console.log(type === "In person");
  //   if (type !== "Online" && type !== "In person") {
  //     console.log("in here");
  //     return Promise.reject("Type must be Online or In person");
  //   }
  //   console.log("here");
  // }),
  check("private").isBoolean().withMessage("Private must be a boolean"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  handleValidationErrors,
];

//Get all groups joined or organized by the current user
// router.get('/:userId')

// const validateCreateGroup = [
//   check("name")

// ];

//Get all groups
router.get("/", async (req, res) => {
  let groups = await Group.findAll();
  res.json({ Groups: groups });
});

//Create a group
router.post("/", requireAuth, validateCreateGroup, async (req, res, next) => {
  let { name, about, type, private, city, state } = req.body;

  if (type !== "Online" && type !== "In person") {
    const err = new Error("Validation Error");
    err.status = 400;
    err.errors = { type: "Type must be Online or In person" };
    return next(err);
  }

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

  // const createdGroup = Group.findOne({
  //   where: { name },
  //   attributes: { exclude: ["numMembers"] },
  // });

  res.send(group);
});

module.exports = router;
