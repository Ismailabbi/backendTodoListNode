require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.createUser = (req, res) => {
  const user = new User({ ...req.body });
  user
    .save()
    .then(() => {
      res.status(201).json({
        message: " used created Successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error saving the user to the database" });
    });
};

module.exports.singIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, async (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "error exist in database",
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "user is not exesting in database",
      });
    }
    const result = await user.authenticate(password);
    if (!result) {
      return res.status(401).json({
        message: "error email and password don't match",
      });
    }
    const payload = { id: user._id.toString() };
    const token = jwt.sign(payload, process.env.secrect_jwt);

    return res.json({ access_token: token });
  });
};

module.exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "the user is sign out ",
  });
};
