const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

// Sends a JWT cookie
//Takes in the response and session user and generates a JWT using the imported secret
// This function will be used in the login and signup routes
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie("token", token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

//Verifies and parses the JWT payload and searches the database for a User with the id in the payload. If there is a User found, save the user to a key of user on the request. Otherwise, clear the token cookie from the response.
//This function will be connected to the API router so that the API route handlers can check if there is a current user logged in or not
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope("currentUser").findByPk(id);
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

// Requires the session user to be authenticated before accessing a route.
// If there is no current user, return an error
// Will be connected to route handlers where there needs to be a current user logged in
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error("Authentication Required");
  err.title = "Unauthorized";
  err.errors = ["Unauthorized"];
  err.status = 401;
  return next(err);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };
