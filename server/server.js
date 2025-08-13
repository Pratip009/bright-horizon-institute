require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const mongoose = require("mongoose");
const { auth } = require("./middleware/authMiddleware");

const app = express();

// ===== CORS CONFIG =====
const allowedOrigins = [
  process.env.FRONTEND_URL,          // e.g. https://brighthorizoninstitute.com
  "http://localhost:5173",           // Vite dev server
  "http://127.0.0.1:5173"             // Some browsers resolve localhost differently
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked: ${origin} not allowed`));
  },
  credentials: true,
}));

// ===== Middleware =====
app.use(express.json({ limit: "10mb" }));
app.use(compression());

// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// ===== Import Routes =====
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const blogRoutes = require("./routes/blogRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const quickProgramsRoute = require("./routes/quickProgramsRoute");
const paymentRoutes = require("./routes/paymentRoutes");

// ===== API Routes =====
app.use("/auth", authRoutes);
app.use("/api/users", auth(["admin"]), userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/quick-programs", quickProgramsRoute);
app.use("/api/payment", paymentRoutes); // works for guests & logged-in users

// ===== Serve Frontend =====
const clientPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ===== Error Handling =====
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message,
  });
});

// ===== Start Server =====
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
