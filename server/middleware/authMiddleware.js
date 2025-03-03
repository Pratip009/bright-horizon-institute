const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  console.log("Headers received:", req.headers); // Debugging log

  if (!req.headers || !req.headers.authorization) {
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
      process.env.JWT_SECRET ||
        "989face8876d8d2283954254a43496eba7bcd1f28849247d58e93354dbdd7573cbac1da64ae0f0d87294ebe958a8d91065f36a1a811dd6f8208794559ce42d70092047172dd51fb3402ef67c7a11886b5114ae1d46392caf5afad16336e0e96fa2f70847dab23f481c0967d792981810a8b7cd6fac3d329bf378ccc003b38c86f88776626e3b3700d23069bbfb37429f788a1f75d80cad51ae97ea7aa211526c15be0c1fb78056b001dacd6e847002274f1225910e7177df1c8cd9d9fa1e5fbac6d8c39f3bc2b6bd7a48f95b924c1826ca4ab3fbbfef757caec5c5def2c3863a775b5bc62fd29c55efada0543762491df86be616764ad456356019404049a730"
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
