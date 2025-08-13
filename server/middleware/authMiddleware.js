const jwt = require("jsonwebtoken");

const auth = (roles = []) => (req, res, next) => {
  try {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("Missing or invalid Authorization header:", authHeader);
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.warn("Token missing after Bearer prefix");
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from environment variables!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check role-based access
    if (roles.length && !roles.includes(decoded.role)) {
      console.warn(`Access denied for user with role ${decoded.role}. Required roles: ${roles}`);
      return res.status(403).json({ message: "Access denied: Insufficient permissions" });
    }

    // Attach decoded user to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Verification Error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  }
};

const adminAuth = (req, res, next) => {
  if (!req.user) {
    console.warn("No user data in request");
    return res.status(401).json({ message: "No user data, authentication required" });
  }
  if (req.user.role !== "admin") {
    console.warn(`Access denied for user with role ${req.user.role}. Admin required`);
    return res.status(403).json({ message: "Access restricted to admins" });
  }
  next();
};

module.exports = { auth, adminAuth };