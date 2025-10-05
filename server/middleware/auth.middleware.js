import jwt from "jsonwebtoken";

import Admin from "../models/admin.model.js";

export const protectAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await Admin.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

