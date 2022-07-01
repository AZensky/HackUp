const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// validateLogin middleware is composed of check and handleValidationErrors middleware. It checks to see whether or not req.body.credential and req.body.password are empty. If one of them are empty, an error will be returned as the response.
const validateLogin = [
  check("email")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  // let { token } = req.cookies;

  const user = await User.login({ email, password });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = "Login failed";
    // err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  let token = await setTokenCookie(res, user);

  user.dataValues.token = token;

  return res.json(user);
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore session user, returns the session user as JSON under the key of user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

module.exports = router;
