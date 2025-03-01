const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  console.log("Headers received:", req.headers); // Debugging log

  if (!req.headers.authorization) {
    console.error("Missing Authorization header!"); // Debugging log
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");
  console.log("Extracted Token:", token); // Debugging log

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_fallback_secret"
    );
    console.log("Decoded Token:", decoded); // Debugging log
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
exports.adminAuth = (req, res, next) => {
  console.log("Checking Admin Role for User:", req.user);

  if (!req.user || req.user.role !== "admin") {
    console.log("Access Denied - Not an Admin");
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
  }

  next();
};
