require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const mongoose = require("mongoose");
const { auth } = require("./middleware/authMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const blogRoutes = require("./routes/blogRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const quickProgramsRoute = require("./routes/quickProgramsRoute");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(compression());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// API Routes
app.use("/auth", authRoutes);
app.use("/api/users", auth(["admin"]), userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/quick-programs", quickProgramsRoute);
app.use("/api/payment", auth(["user", "admin"]), paymentRoutes);

// Serve React Frontend
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));