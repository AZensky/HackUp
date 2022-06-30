const express = require("express");

const { Group } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  let groups = await Group.findAll();
  res.json({ Groups: groups });
});

module.exports = router;
