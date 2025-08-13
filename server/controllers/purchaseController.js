const User = require("../models/User");
const Course = require("../models/QuickPrograms");
const Purchase = require("../models/Purchase");
const axios = require("axios");

// ✅ Create PayPal Order
exports.initiatePayment = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "Missing userId or courseId" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    // Prevent duplicate purchase
    const alreadyPurchased = await Purchase.findOne({
      user: userId,
      course: courseId,
      status: "completed",
    });

    if (alreadyPurchased) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    // Create PayPal order
    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: course.price.toString(),
            },
          },
        ],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/payment-success?paymentId={payment_id}`,
          cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
        },
      },
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET,
        },
      }
    );

    const approval_url = response.data.links.find(
      (link) => link.rel === "approve"
    )?.href;
    const paymentId = response.data.id;

    if (!approval_url || !paymentId) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve PayPal link" });
    }

    // Create pending purchase
    await Purchase.create({
      user: userId,
      course: courseId,
      amount: course.price,
      paymentId,
      status: "pending",
    });

    res.status(200).json({ approval_url, paymentId });
  } catch (error) {
    console.error("❌ PayPal initiatePayment error:", error.message);
    res
      .status(500)
      .json({ message: "PayPal payment failed", error: error.message });
  }
};

// ✅ Capture PayPal Order & Complete Purchase
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId, payerId } = req.body;

    if (!paymentId || !payerId) {
      return res.status(400).json({ message: "Missing paymentId or payerId" });
    }

    // Capture the order from PayPal
    const captureResponse = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paymentId}/capture`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET,
        },
      }
    );

    // Find purchase record
    const purchase = await Purchase.findOne({ paymentId })
      .populate("course")
      .populate("user");

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // Update status to completed
    purchase.status = "completed";
    await purchase.save();

    // Add course to user's purchasedCourses
    purchase.user.purchasedCourses.push({
      course: purchase.course._id,
      purchasedAt: new Date(),
    });
    await purchase.user.save();

    res.status(200).json({
      message: "Payment verified successfully",
      purchase,
      paypal: captureResponse.data,
    });
  } catch (error) {
    console.error(
      "❌ PayPal verifyPayment error:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Failed to verify payment" });
  }
};

// ✅ Cancel Purchase
exports.cancelPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    await Purchase.findOneAndUpdate({ paymentId }, { status: "failed" });
    res.status(200).json({ message: "Payment cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel payment" });
  }
};

// ✅ Get All Purchases
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Purchase.find()
      .populate("user", "username contact")
      .populate("course", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};
