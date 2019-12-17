const express = require("express"),
  router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Users API Page" });
});

module.exports = router;
