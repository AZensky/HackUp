const router = require("express").Router();

// Add a XSRF-TOKEN cookie
router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

router.post("/test", function (req, res) {
  console.log(req.body);
  res.json({ requestBody: req.body });
});

module.exports = router;
