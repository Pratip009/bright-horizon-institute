// backend/routes/paymentRoutes.js
const express = require("express");
const paypal = require("@paypal/checkout-server-sdk");
const router = express.Router();

// ===== PayPal Client =====
function paypalClient() {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    throw new Error("Missing PayPal environment variables");
  }

  const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
  return new paypal.core.PayPalHttpClient(environment);
}

// ===== Create PayPal Order =====
router.post("/create", async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: "Valid amount is required" });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      { amount: { currency_code: "USD", value: amount.toString() } }
    ],
  });

  try {
    const order = await paypalClient().execute(request);
    const approvalUrl = order.result.links.find(l => l.rel === "approve")?.href;

    if (!approvalUrl) {
      return res.status(500).json({ error: "No approval link from PayPal" });
    }

    res.json({
      orderId: order.result.id,
      approval_url: approvalUrl
    });
  } catch (err) {
    console.error("PayPal create order error:", err.message);
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

// ===== Capture PayPal Order =====
router.post("/capture", async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await paypalClient().execute(request);
    res.json(capture.result);
  } catch (err) {
    console.error("PayPal capture order error:", err.message);
    res.status(500).json({ error: "Failed to capture PayPal order" });
  }
});

module.exports = router;
