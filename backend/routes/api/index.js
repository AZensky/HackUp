const router = require("express").Router();
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");
const eventsRouter = require("./events.js");
const venuesRouter = require("./venues.js");
const imagesRouter = require("./images.js");
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/groups", groupsRouter);

router.use("/events", eventsRouter);

router.use("/venues", venuesRouter);

router.use("/images", imagesRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      email: "demo@user.io",
    },
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

// Add a XSRF-TOKEN cookie
router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
