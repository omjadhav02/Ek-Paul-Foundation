import admin from "../config/firebaseAdmin.js";

export const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach decoded Firebase user data to req
    req.admin = decodedToken;

    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
