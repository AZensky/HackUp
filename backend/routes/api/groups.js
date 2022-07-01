const express = require("express");

const { Group } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  let groups = await Group.findAll();
  res.json({ Groups: groups });
});

router.post("/", async (req, res) => {
  let { name, about, type, private, city, state } = req.body;
  // let group = await Group.create
});

module.exports = router;
