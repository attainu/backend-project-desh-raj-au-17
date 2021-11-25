const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// new user signUp
router.route("/register").post(registerUser);

// existing user login.
router.route("/login").post(loginUser);

//forgot password email route.
router.route("/password/forgot").post(forgotPassword);

//reset password email route.
router.route("/password/reset/:token").put(resetPassword);

// logout.
router.route("/logout").get(logout);

module.exports = router;
