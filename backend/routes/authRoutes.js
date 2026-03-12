const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe, logout } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe); 
router.get("/logout", logout);

module.exports = router;
