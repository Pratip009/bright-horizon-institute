const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
  initiatePayment,
  verifyPayment,
  cancelPayment,
  getAllPayments,
} = require("../controllers/purchaseController");

router.post("/", auth(), initiatePayment);
router.post("/verify", auth(), verifyPayment);
router.post("/cancel/:paymentId", auth(), cancelPayment);
router.get("/", auth(["admin"]), getAllPayments);

module.exports = router;
