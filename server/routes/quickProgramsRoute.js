const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
  createQuickProgram,
  getQuickPrograms,
  getQuickProgramById,
  updateQuickProgram,
  deleteQuickProgram,
} = require("../controllers/QuickProgramController");

// Public routes
router.get("/", getQuickPrograms);
router.get("/:id", getQuickProgramById);

// Admin routes (protected)
router.post("/", auth(["admin"]), createQuickProgram);
router.put("/:id", auth(["admin"]), updateQuickProgram);
router.delete("/:id", auth(["admin"]), deleteQuickProgram);

module.exports = router;
