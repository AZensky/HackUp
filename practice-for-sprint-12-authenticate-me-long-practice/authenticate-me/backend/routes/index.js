const express = require("express");
const router = express.Router();

const apiRouter = require("./api");

router.use("/api", apiRouter);

// Add a XSRF-TOKEN cookie

module.exports = router;
