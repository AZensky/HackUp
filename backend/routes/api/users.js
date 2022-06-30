const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// validateSignup middleware checks that the body of the request has keys of username, email, and password, and validates them
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("firstName").exists({ checkFalsy: true }),
  // .isLength({ min: 4 })
  // .withMessage("Please provide a username with at least 4 characters."),
  check("lastName").exists({ checkFalsy: true }),
  // check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
// If the user is successfully created, call the setTokenCookie method and return JSON response with user info. If creation is unsuccessful, a Sequelize Validation error will be passed onto the next error-handling middleware.
router.post("/", validateSignup, async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const user = await User.signup({ firstName, lastName, email, password });

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});

module.exports = router;
