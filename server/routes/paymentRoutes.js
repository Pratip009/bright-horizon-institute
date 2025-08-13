const express = require("express");
const paypal = require("@paypal/checkout-server-sdk");
const router = express.Router();
require("dotenv").config();

const Environment =
  process.env.PAYPAL_MODE === "live"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

// Create order
router.post("/create", async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: req.body.amount,
          },
        },
      ],
      application_context: {
        brand_name: "Bright Horizon Institute",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.FRONTEND_URL}/payment-success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      },
    });

    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating PayPal order");
  }
});

// Capture order
router.post("/capture/:orderId", async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCaptureRequest(req.params.orderId);
    request.requestBody({});
    const capture = await paypalClient.execute(request);
    res.json(capture.result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error capturing PayPal order");
  }
});

module.exports = router;
