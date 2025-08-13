require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const mongoose = require("mongoose");
const paypal = require("paypal-rest-sdk");
const { auth } = require("./middleware/authMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const blogRoutes = require("./routes/blogRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const quickProgramsRoute = require("./routes/quickProgramsRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// API Routes
app.use("/auth", authRoutes);
app.use("/api/users", auth(["admin"]), userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/quick-programs", quickProgramsRoute);

// PayPal Configuration
paypal.configure({
  mode: "sandbox", // or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// ✅ Payment Route
app.post("/api/payment", auth(["user", "admin"]), (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: `${process.env.BACKEND_URL}/api/paypal-success`,
      cancel_url: `${process.env.BACKEND_URL}/api/paypal-cancel`,
    },
    transactions: [
      {
        amount: { currency: "USD", total: amount.toFixed(2) },
        description: "Course Payment",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (err, payment) => {
    if (err) {
      console.error("PayPal Error:", err);
      return res.status(500).json({ error: "Payment creation failed" });
    }

    const approvalUrl = payment.links.find(link => link.rel === "approval_url");
    if (!approvalUrl) return res.status(500).json({ error: "No approval URL found" });

    res.json({ approval_url: approvalUrl.href });
  });
});

// ✅ PayPal Success
app.get("/api/paypal-success", (req, res) => {
  const { PayerID, paymentId } = req.query;
  if (!PayerID || !paymentId) return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);

  paypal.payment.execute(paymentId, { payer_id: PayerID }, (err, payment) => {
    if (err) {
      console.error("PayPal Execution Error:", err);
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }
    res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
  });
});

// ✅ PayPal Cancel
app.get("/api/paypal-cancel", (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
});

// Serve React Frontend
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
