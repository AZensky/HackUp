const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// Log in
router.post("/", async (req, res, next) => {
  const { credential, password } = req.body;

  // Call the User login static method
  const user = await User.login({ credential, password });

  // If there is no user returned from the login static method, create a login failed error, and invoke the next error handling middleware
  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  // If there is a user returned, then call setTokeCookie, and return a JSON response with the user information
  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});

module.exports = router;
