const express = require("express");
const paypal = require("paypal-rest-sdk");

const router = express.Router();

// Validate environment variables
const requiredEnvVars = [
  "PAYPAL_CLIENT_ID",
  "PAYPAL_CLIENT_SECRET",
  "PAYPAL_MODE",
  "FRONTEND_URL",
];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error("❌ Missing environment variables:", missingEnvVars.join(", "));
  throw new Error("Missing required environment variables for PayPal configuration");
}

// PayPal configuration
paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox", // 'sandbox' or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Create PayPal payment
router.post("/", (req, res) => {
  const { amount } = req.body;

  // Validate amount
  if (!amount || isNaN(amount) || amount <= 0) {
    console.error("Invalid amount received:", amount);
    return res.status(400).json({ error: "Invalid amount: Must be a positive number" });
  }

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: parseFloat(amount).toFixed(2),
        },
        description: "Course Payment",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (err, payment) => {
    if (err) {
      console.error("❌ PayPal Payment Creation Error:", JSON.stringify(err, null, 2));
      return res.status(500).json({
        error: "Payment creation failed",
        details: err.response?.message || err.message,
      });
    }

    const approvalUrl = payment.links.find((link) => link.rel.toLowerCase() === "approval_url");

    if (!approvalUrl) {
      console.error("No approval URL found in PayPal response:", payment);
      return res.status(500).json({ error: "No approval URL found" });
    }

    res.json({ approval_url: approvalUrl.href });
  });
});

// Execute PayPal payment
router.post("/execute", (req, res) => {
  const { paymentId, PayerID } = req.body;

  if (!paymentId || !PayerID) {
    console.error("Missing payment details:", { paymentId, PayerID });
    return res.status(400).json({ error: "Missing paymentId or PayerID" });
  }

  const execute_payment_json = { payer_id: PayerID };

  paypal.payment.execute(paymentId, execute_payment_json, (err, payment) => {
    if (err) {
      console.error("❌ PayPal Payment Execution Error:", JSON.stringify(err, null, 2));
      return res.status(500).json({
        error: "Payment execution failed",
        details: err.response?.message || err.message,
      });
    }

    res.json({ success: true, payment });
  });
});

module.exports = router;