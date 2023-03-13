const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          console.log(value)
          return value.length >= 6;
        },
        message: "Password should be at least 6 characters long.",
      }
    },

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);



userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compare(password, this.password);
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
