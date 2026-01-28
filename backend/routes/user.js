const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/user");

// 🔹 SIGNUP (REGISTER USER)
router.post("/signup", wrapAsync(userController.signup));

// 🔹 LOGIN
router.post("/login", passport.authenticate("local"), userController.login);

// 🔹 LOGOUT
router.post("/logout", userController.logout);

// 🔹 CHECK CURRENT LOGGED IN USER (VERY IMPORTANT FOR FRONTEND)
router.get("/me", userController.getCurrentUser);

module.exports = router;


// D:\Web_Dev\backends\airbnb-clone backend\routes\user.js
