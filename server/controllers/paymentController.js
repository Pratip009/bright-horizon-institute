const paypal = require("@paypal/checkout-server-sdk");
const QuickProgram = require("../models/QuickPrograms");
const Payment = require("../models/Payment");

// PayPal environment setup
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Create PayPal order
const createOrder = async (req, res) => {
  try {
    const programId = req.params.id;

    const program = await QuickProgram.findById(programId);
    if (!program) return res.status(404).json({ error: "Program not found" });

    const orderRequest = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: program.price.toFixed(2) },
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

// Capture PayPal payment and save to MongoDB
const captureOrder = async (req, res) => {
  try {
    const { orderID, programID } = req.body;
    const userId = req.user.id; // From auth middleware

    if (!orderID || !programID)
      return res.status(400).json({ error: "Order ID and Program ID are required" });

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client.execute(request);

    // Extract amount and currency
    const captureData = capture.result.purchase_units[0].payments.captures[0];
    const amount = parseFloat(captureData.amount.value);
    const currency = captureData.amount.currency_code;

    // Save payment
    const payment = new Payment({
      user: userId,
      program: programID,
      amount,
      currency,
      paypalOrderId: orderID,
      status: capture.result.status,
    });

    await payment.save();

    res.json({ message: "Payment captured and saved successfully", capture: capture.result });
  } catch (err) {
    console.error("PayPal capture error:", err);
    res.status(500).json({ error: "Failed to capture payment" });
  }
};

// Admin: get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "username email")
      .populate("program", "title price");
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};

module.exports = { createOrder, captureOrder, getAllPayments };
