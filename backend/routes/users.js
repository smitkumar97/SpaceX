const bcryptjs = require("bcryptjs");
const _ = require("lodash");
const validate = require("../models/users.model");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const User = require("../models/users.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error" + err));
});
router.post("/register", async (req, res) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hashSync(req.body.password, salt);
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = hashedPassword;
  const newUser = new User({ name, username, email, password: hashedPassword });

  await newUser
    .save()
    .then(() => res.json("User added successfully."))
    .catch((err) => res.status(400).json("Error" + err));
  res.redirect("/");
});

router.post("/users/login", auth, async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
    res.redirect("/");
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
    res.redirect("/login");
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
