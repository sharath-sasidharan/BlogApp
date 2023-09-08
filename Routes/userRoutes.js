const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../Controllers/userController");

//router object

const router = express.Router();

// Get all users
router.get("/all-users", getAllUsers);
//Create a user
router.post("/register", registerUser);
//Login a user
router.post("/login", loginUser);

module.exports = router;
