// routes/paymentRoutes.js
const express = require("express");
const {
  verifyPayment,
  initiatePayment,
  getAllPayments,
} = require("../controllers/purchaseController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

// Initiate a payment
router.post("/", auth(), initiatePayment);

// Verify payment after gateway callback
router.post("/verify", auth(), verifyPayment);

// Get all payments (admin only)
router.get("/all", auth(["admin"]), getAllPayments);

module.exports = router;
