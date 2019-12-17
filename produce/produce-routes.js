const express = require("express"),
  router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Produce API Page" });
});

module.exports = router;
