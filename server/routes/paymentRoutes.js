const express = require("express");
const paypal = require("@paypal/checkout-server-sdk");
const router = express.Router();

// PayPal Client
function paypalClient() {
  let environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
  return new paypal.core.PayPalHttpClient(environment);
}

// POST /api/payment — create PayPal order
router.post("/", async (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{ amount: { currency_code: "USD", value: amount } }],
  });

  try {
    const order = await paypalClient().execute(request);
    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    )?.href;
    if (!approvalUrl) {
      throw new Error("No approval link from PayPal");
    }
    res.json({ approval_url: approvalUrl });
  } catch (err) {
    console.error("PayPal create order error:", err);
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

module.exports = router;
