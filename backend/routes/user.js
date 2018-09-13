const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: "User created!",
        result: result
      });
    }).catch(err => {
      res.status(500).json({
        message: "Invalid authentication credentials!"
      });
    })
  });
});

router.post("/login", (req, res, next) => {
  let user;
  User.find({ email: req.body.email})
  .then(foundUser => {
    if (!foundUser) {
      return res.status(401).json({
        message: "auth failed"
      });
    }
    user = foundUser[0];
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "auth failed"
      });
    }
    const token = jwt.sign(
      {email: user.email, userId: user._id},
      "secret_this_should_be_longer",
     {expiresIn: "1h"}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: user._id
    });
  }).catch(err => {
    return res.status(401).json({
      message: "auth failed"
    });
  });
});

module.exports = router;
