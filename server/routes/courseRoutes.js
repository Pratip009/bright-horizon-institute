const express = require("express");
const router = express.Router();
const { auth, adminAuth } = require("../middleware/authMiddleware");
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController");

// Public Routes
router.get("/", getCourses); 
router.get("/:id", getCourseById);

// Admin Routes (Protected)
router.post("/", auth(["admin"]), createCourse); // Add a new course
router.put("/:id", auth(["admin"]), updateCourse); // Update a course
router.delete("/:id", auth(["admin"]), deleteCourse); // Delete a course

module.exports = router;
