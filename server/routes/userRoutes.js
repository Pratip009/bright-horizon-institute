const express = require("express");
const { getUsers, deleteUser } = require("../controllers/userController");
const { auth, adminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Ensure auth runs before adminAuth
router.get("/", auth, adminAuth, getUsers);
router.delete("/:id", auth, adminAuth, deleteUser);

module.exports = router;
