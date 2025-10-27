import adminFirebase from "../db/firebase.js";

/**
 * Signup with Email/Password
 */
export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters!" });
    }

    // Create admin in Firebase Auth
    const userRecord = await adminFirebase.auth().createUser({
      email,
      password,
      displayName: username,
    });

    // Generate email verification link
    const emailLink = await adminFirebase.auth().generateEmailVerificationLink(email);

    res.status(201).json({
      message: "Admin created! Please verify your email.",
      adminId: userRecord.uid,
      emailLink,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Login with Firebase ID Token (Email/Password or Google)
 */
export const login = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    // Verify Firebase ID token
    const decodedToken = await adminFirebase.auth().verifyIdToken(idToken);

    res.status(200).json({
      message: "Login successful",
      admin: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.displayName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * Logout - revoke refresh tokens
 */
export const logout = async (req, res) => {
  try {
    const { uid } = req.admin;

    await adminFirebase.auth().revokeRefreshTokens(uid);

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Protect admin routes middleware
 */
export const protectAdmin = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization?.split(" ")[1];

    if (!idToken) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decodedToken = await adminFirebase.auth().verifyIdToken(idToken);

    req.admin = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.displayName,
    };

    next();
  } catch (error) {
    console.error("ProtectAdmin error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
