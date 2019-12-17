const express = require("express"),
  Users = require("./user-model"),
  router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Users API Page" });
});
router.get("/all", (req, res) => {
  Users.find()
    .then(users => {
      users.map(user => {
        if (user.farmer == 1) {
          user.farmer = true;
        } else {
          user.farmer = false;
        }
      });
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access users database!" });
    });
});
router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user.length > 0) {
        if (user.farmer == 1) {
          user.farmer = true;
        } else {
          user.farmer = false;
        }
        res.status(200).json(user);
      } else {
        res.status(201).json({ errorMessage: "That user does not exist!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access users database!" });
    });
});

module.exports = router;
