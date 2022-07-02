const express = require("express");
const { Event, Group, Venue } = require("../../db/models");

const router = express.Router();

router.get("/:eventId", async (req, res) => {
  const event = await Event.findByPk(req.params.eventId, {
    attributes: { exclude: ["previewImage", "createdAt", "updatedAt"] },
    include: {
      model: Group,
      attributes: ["id", "name", "private", "city", "state"],
    },
  });

  if (!event) {
    res.status(404);
    res.json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  res.json(event);
});

//route handler for getting all events, need to add venues association later
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
