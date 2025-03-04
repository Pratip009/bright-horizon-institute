const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // ✅ Fix: Use `req.headers.authorization` instead of `req.header`
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access restricted to admins." });
  }
  next();
};

module.exports = { auth, adminAuth };
