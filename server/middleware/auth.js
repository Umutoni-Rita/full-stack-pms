const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    // Extract Authorization header
    const authHeader = req.headers.authorization;

    // Validate header format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Invalid or missing Authorization header" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Authentication token required" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validate decoded token
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Attach user to request
    req.user = { id: decoded.id, role: decoded.role };

    // Proceed to next middleware
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // Handle other errors
    return res
      .status(500)
      .json({ message: "Authentication error", error: error.message });
  }
};

// Admin middleware (for completeness)
const isAdmin = (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }

  // Proceed to next middleware
  next();
};

module.exports = { authenticate, isAdmin };
