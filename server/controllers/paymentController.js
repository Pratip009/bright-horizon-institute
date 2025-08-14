// controllers/paymentController.js
const paypal = require("@paypal/checkout-server-sdk");
const QuickProgram = require("../models/QuickPrograms");

// Set up PayPal environment
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Create order dynamically based on program price
const createOrder = async (req, res) => {
  try {
    const programId = req.params.id;

    // Fetch program from DB
    const program = await QuickProgram.findById(programId);
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    // Create PayPal order
    const orderRequest = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: program.price.toFixed(2), // dynamic price
          },
          description: program.title,
        },
      ],
    };

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody(orderRequest);

    const order = await client.execute(request);

    res.json({ orderID: order.result.id });
  } catch (err) {
    console.error("PayPal create order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Capture the payment after approval
const captureOrder = async (req, res) => {
  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client.execute(request);

    res.json({ message: "Payment captured successfully", capture: capture.result });
  } catch (err) {
    console.error("PayPal capture error:", err);
    res.status(500).json({ error: "Failed to capture payment" });
  }
};

// Admin: get all payments
const getAllPayments = async (req, res) => {
  try {
    // You can implement fetching from DB if you store payments
    res.json({ message: "Admin payment list endpoint" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};

module.exports = { createOrder, captureOrder, getAllPayments };
