// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  Userlogout,
  verifyOtp,
  forgetPassword,
  resetPassword,
} = require("../controllers/usercontrollers");
const auth = require("../middlewares/auth");
const Admin = require("../middlewares/admin");
const user = require("../middlewares/user");

// basic routes
// Register
router.post("/register", registerUser);
// verify otp
router.post("/verify-otp", verifyOtp);
// Login user
router.post("/login", loginUser);
// logout
router.get("/logout", auth, Userlogout);

router.get("/", getAllUsers);
// Delete user by ID
router.delete("/:id", deleteUser);

// user routes
// Get a single user by ID
router.get("/:id", auth, user, getUserById);
// Update user by ID
router.put("/:id", auth, user, updateUser);
// password
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:resetToken", resetPassword);
module.exports = router;
