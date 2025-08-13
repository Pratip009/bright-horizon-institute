require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const mongoose = require("mongoose");
const { auth } = require("./middleware/authMiddleware");

const app = express();

// ===== CORS CONFIG: Allow all origins =====
const allowedOrigins = [
  "http://localhost:5173",
  "https://brighthorizoninstitute.com",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin} not allowed`));
    }
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

// ===== Routes =====
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const blogRoutes = require("./routes/blogRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const quickProgramsRoute = require("./routes/quickProgramsRoute");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/auth", authRoutes);
app.use("/api/users", auth(["admin"]), userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/quick-programs", quickProgramsRoute);
app.use("/api/payment", paymentRoutes);

// ===== Serve Frontend in Production =====
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientPath));

  // SPA Fallback for any non-API route
  app.get("*", (req, res) => {
    if (!req.originalUrl.startsWith("/api")) {
      res.sendFile(path.join(clientPath, "index.html"));
    }
  });
}

// ===== Error Handling =====
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// ===== Start Server =====
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
