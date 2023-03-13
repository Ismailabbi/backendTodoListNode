const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/createUser", authController.createUser);
authRouter.post("/signIn", authController.singIn);
authRouter.post("/signOut", authController.signOut);

module.exports = authRouter;
