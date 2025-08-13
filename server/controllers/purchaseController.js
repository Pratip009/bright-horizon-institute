const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/User");
const Course = require("../models/Course");
const Purchase = require("../models/Purchase");
const logger = require("../utils/logger");

const getPayPalAccessToken = async () => {
  try {
    const paypalBaseUrl = process.env.PAYPAL_MODE === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      throw new Error("PayPal credentials are missing in environment variables");
    }

    const response = await axios.post(
      `${paypalBaseUrl}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.data.access_token) {
      throw new Error("Failed to retrieve PayPal access token");
    }

    logger.info("✅ PayPal access token retrieved successfully");
    return response.data.access_token;
  } catch (error) {
    logger.error("❌ getPayPalAccessToken error:", {
      message: error.message,
      paypalError: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      clientId: process.env.PAYPAL_CLIENT_ID ? "Present" : "Missing",
      secret: process.env.PAYPAL_CLIENT_SECRET ? "Present" : "Missing",
      paypalMode: process.env.PAYPAL_MODE,
      stack: error.stack,
    });
    throw new Error("Failed to authenticate with PayPal");
  }
};

const initiatePayment = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      return res.status(400).json({ message: "Missing userId or courseId" });
    }

    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized: User ID mismatch" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    if (isNaN(course.price) || course.price <= 0) {
      return res.status(400).json({ message: "Invalid course price" });
    }

    const alreadyPurchased = await Purchase.findOne({
      user: userId,
      course: courseId,
      status: "completed",
    });
    if (alreadyPurchased) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    const paypalBaseUrl = process.env.PAYPAL_MODE === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

    const accessToken = await getPayPalAccessToken();

    const orderResponse = await axios.post(
      `${paypalBaseUrl}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: course.price.toFixed(2),
            },
            description: `Purchase of ${course.title}`,
          },
        ],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/payment-success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const approval_url = orderResponse.data.links.find(
      (link) => link.rel === "approve"
    )?.href;
    const paymentId = orderResponse.data.id;

    if (!approval_url || !paymentId) {
      return res.status(500).json({ message: "Failed to create PayPal order" });
    }

    await Purchase.create({
      user: userId,
      course: courseId,
      amount: course.price,
      paymentId,
      status: "pending",
    });

    logger.info(`✅ Payment initiated for user ${userId}, course ${courseId}`);
    res.status(200).json({ approval_url, paymentId });
  } catch (error) {
    logger.error("❌ PayPal initiatePayment error:", {
      message: error.message,
      paypalError: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
      userId: req.body.userId,
      courseId: req.body.courseId,
    });
    res.status(500).json({
      message: "PayPal payment failed",
      error: error.response?.data?.message || error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;
    if (!paymentId) {
      return res.status(400).json({ message: "Missing paymentId" });
    }

    const purchase = await Purchase.findOne({ paymentId });
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    if (purchase.status === "completed") {
      return res.status(400).json({ message: "Payment already completed" });
    }

    const paypalBaseUrl = process.env.PAYPAL_MODE === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

    const accessToken = await getPayPalAccessToken();

    const captureResponse = await axios.post(
      `${paypalBaseUrl}/v2/checkout/orders/${paymentId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (captureResponse.data.status !== "COMPLETED") {
      return res.status(400).json({ message: "Payment capture failed" });
    }

    purchase.status = "completed";
    await purchase.save();

    const user = await User.findById(purchase.user);
    user.purchasedCourses.push({
      course: purchase.course,
      purchasedAt: new Date(),
    });
    await user.save();

    logger.info(`✅ Payment verified for paymentId ${paymentId}`);
    res.status(200).json({
      message: "Payment verified successfully",
      purchase,
      paypal: captureResponse.data,
    });
  } catch (error) {
    logger.error("❌ PayPal verifyPayment error:", {
      message: error.message,
      paypalError: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
      paymentId: req.body.paymentId,
    });
    res.status(500).json({
      message: "Failed to verify payment",
      error: error.response?.data?.message || error.message,
    });
  }
};

const cancelPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    if (!paymentId) {
      return res.status(400).json({ message: "Missing paymentId" });
    }

    const purchase = await Purchase.findOne({ paymentId });
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    purchase.status = "cancelled";
    await purchase.save();

    logger.info(`✅ Payment cancelled for paymentId ${paymentId}`);
    res.status(200).json({ message: "Payment cancelled successfully" });
  } catch (error) {
    logger.error("❌ PayPal cancelPayment error:", {
      message: error.message,
      stack: error.stack,
      paymentId: req.params.paymentId,
    });
    res.status(500).json({
      message: "Failed to cancel payment",
      error: error.message,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("user", "email username")
      .populate("course", "title");

    logger.info("✅ Retrieved all payments", { userId: req.user.id });
    res.status(200).json(purchases);
  } catch (error) {
    logger.error("❌ getAllPayments error:", {
      message: error.message,
      stack: error.stack,
      userId: req.user.id,
    });
    res.status(500).json({
      message: "Failed to retrieve payments",
      error: error.message,
    });
  }
};
const paymentSuccess = async (req, res) => {
  try {
    const { token, PayerID } = req.query;

    if (!token || !PayerID) {
      return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=failed`);
    }

    // Find the purchase by paymentId (token)
    const purchase = await Purchase.findOne({ paymentId: token });
    if (!purchase) {
      return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=failed`);
    }

    // If already completed, redirect with success
    if (purchase.status === "completed") {
      return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=success`);
    }

    // Capture the payment via PayPal
    const paypalBaseUrl = process.env.PAYPAL_MODE === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

    const accessToken = await getPayPalAccessToken();

    const captureResponse = await axios.post(
      `${paypalBaseUrl}/v2/checkout/orders/${token}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (captureResponse.data.status === "COMPLETED") {
      // Mark purchase as completed
      purchase.status = "completed";
      await purchase.save();

      // Add course to user's purchased courses
      const user = await User.findById(purchase.user);
      if (user) {
        user.purchasedCourses.push({
          course: purchase.course,
          purchasedAt: new Date(),
        });
        await user.save();
      }

      return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=success`);
    } else {
      return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=failed`);
    }
  } catch (error) {
    console.error("Payment success error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=failed`);
  }
};

module.exports = {
  initiatePayment,
  verifyPayment,
  cancelPayment,
  getAllPayments,
  paymentSuccess
};