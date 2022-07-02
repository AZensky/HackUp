const express = require("express");
const { Event, Group } = require("../../db/models");

const router = express.Router();

//route handler for getting all events, need to add venues association later
router.get("/", async (req, res) => {
  const events = await Event.findAll({
    include: {
      model: Group,
      attributes: ["id", "name", "city", "state"],
    },
  });

  res.json({ Events: events });
});

module.exports = router;
