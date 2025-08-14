const express = require("express");
const router = express.Router();
const {
  createOrder,
  captureOrder,
  getAllPayments,
  checkUserPayment
} = require("../controllers/paymentController");
const { auth } = require("../middleware/authMiddleware");

router.post("/create-order/:id", auth(["user"]), createOrder);
router.post("/capture-order", auth(["user"]), captureOrder);
router.get("/", auth(["admin"]), getAllPayments);
router.get("/check/:programID", auth(["user"]), checkUserPayment);

module.exports = router;
