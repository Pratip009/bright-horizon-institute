/* eslint-disable no-undef */
const express = require("express");
const paypal = require("paypal-rest-sdk");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing for POST requests

// PayPal configuration
paypal.configure({
  mode: "sandbox", // Change to 'live' for production
  client_id: "AWZxXnaTRcQDTuP4EdH3ICEpXYpYuNzge0QClzRGGkfuFImQ4pVZH0fV9w4b4bZlUJIw-wEPUp_xpVpf",
  client_secret: "EIL5LkOxVUZD8HJemKl59Vsm6ByLGTE9LENtMco5x2PXxSxCvr-ph61XoI4dtsdIEvUU6CweMYqbytU1",
});

// Route to initiate PayPal payment
app.post("/payment", async (req, res) => {
  try {
    const { amount } = req.body; // Get amount from frontend

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid payment amount" });
    }

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:8000/success",
        cancel_url: "http://localhost:8000/failed",
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: amount.toFixed(2),
          },
          description: `Payment for course - $${amount}`,
        },
      ],
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error("PayPal Error:", error);
        return res.status(500).json({ error: "Payment creation failed" });
      } else {
        const approvalUrl = payment.links.find((link) => link.rel === "approval_url");
        if (approvalUrl) {
          res.json({ approval_url: approvalUrl.href });
        } else {
          res.status(500).json({ error: "No approval URL found" });
        }
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle successful payment
app.get("/success", async (req, res) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    if (!payerId || !paymentId) {
      return res.redirect("http://localhost:5173/failed");
    }

    paypal.payment.execute(paymentId, { payer_id: payerId }, (error, payment) => {
      if (error) {
        console.error("Execution Error:", error);
        return res.redirect("http://localhost:5173/failed");
      } else {
        console.log("Payment Successful:", payment);
        return res.redirect("http://localhost:5173/success");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.redirect("http://localhost:5173/failed");
  }
});

// Route to handle failed payment
app.get("/failed", (req, res) => {
  return res.redirect("http://localhost:5173/failed");
});

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
