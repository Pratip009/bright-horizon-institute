const express = require("express");
const router = express.Router();
const { auth, adminAuth } = require("../middleware/authMiddleware");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Public Routes
router.get("/", getBlogs); // Get all courses
router.get("/:id", getBlogById); // Get a course by ID

// Admin Routes (Protected)
router.post("/", auth, adminAuth, createBlog); // Add a new course
router.put("/:id", auth, adminAuth, updateBlog); // Update a course
router.delete("/:id", auth, adminAuth, deleteBlog); // Delete a course

module.exports = router;
