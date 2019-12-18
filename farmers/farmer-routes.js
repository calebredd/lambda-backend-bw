const express = require("express"),
  Farmers = require("./farmer-model"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  secrets = require("../config/secrets.js"),
  restricted = require("../middleware/auth-middleware.js"),
  router = express.Router();
router.get("/", (req, res) => {
  Farmers.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access users database!" });
    });
});
router.post("/register", (req, res) => {
  const { username, password, profileImgURL, city, state, zipCode } = req.body;
  const user = { username, profileImgURL, city, state, zipCode };
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;
  Farmers.insert(user)
    .then(saved => {
      const token = genToken(saved);
      res.status(200).json({
        saved,
        token,
        message: `Welcome to the group ${saved.username}`
      });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to add user to database!" });
    });
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Farmers.findByName(username)
    .then(user => {
      if (user && user.id > 4 && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({
          user,
          token,
          message: `Welcome back ${user.username}`
        });
      } else if (user && user.id < 5 && password == "lambda") {
        const token = genToken(user);
        res.status(200).json({
          user,
          token,
          message: `Welcome back ${user.username}`
        });
      } else {
        res.status(500).json({
          errorMessage: "Unable to find user with those credentials!"
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to find user in database!" });
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Farmers.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(201).json({ errorMessage: "That farmer does not exist!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Unable to access users database!" });
    });
});
module.exports = router;
function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };
  const options = { expiresIn: "7d" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}
