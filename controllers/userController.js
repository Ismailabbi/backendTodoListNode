const User = require("../models/user");
const mongoose = require("mongoose");

module.exports.getUserById = (req, res) => {
    const userId = req.auth.id;

    User.findOne({ _id: mongoose.Types.ObjectId(userId) }, async (err, user) => {
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
        return res.json({
            name: user.name,
            email: user.email
        });
    });
};
