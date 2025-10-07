import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { adminVerificationTemplate } from "../utils/email-templates/adminVerification.js";

const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const signup = async (req, res)=>{
    try {
        const { username, email, password } = req.body;

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long!"})
        }

        if(!username.trim() || !email.trim() || !password.trim()){
            return res.status(401).json({message: "Fields are missing!"})
        }

        const exists = await Admin.findOne({email});

        if(exists){
            return res.status(400).json({message:"Admin Already Exists"});
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        const otpExpiry = Date.now() + 10 * 60 * 1000;

        const admin = await Admin.create({
            username, 
            email, 
            password,
            otp,
            otpExpiry,
        });
        
        const name = username.split(" ")[0];
        const html = adminVerificationTemplate(name, otp);

        await sendEmail(email, "Email Verification - Ek Paul Foundation ",html)

        res.status(201).json({
            message: "Please verify email!, Check your inbox for the OTP",
            adminId: admin._id, 
        });

        
    }catch (error) {
        console.error("Error in Signup Controller",error);
        res.status(500).json({message: error.message})
    }
}

export const verifyEmail = async (req,res)=>{
    try {
    const { email, otp } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    // Check OTP expiry
    if (Date.now() > admin.otpExpiry) {
      await admin.deleteOne(); // delete expired admin
      return res.status(400).json({ success: false, message: "OTP expired. Please register again." });
    }

    // Check OTP match
    if (admin.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // Mark verified and clear OTP info
    admin.isVerified = true;
    admin.otp = null;
    admin.otpExpiry = null;
    await admin.save();

    res.status(200).json({ success: true, message: "Email verified successfully!" });

  } catch (error) {
    console.error("Error verifying Admin OTP:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(404).json({message:"Admin not Found!"});
        }

        const isMatch = await admin.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid Credentials!"})
        }

        const token = generateToken(admin._id);

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        console.log("Login Successful!");
        res.status(200).json({
            message: "Login Successful!",
            token,
            admin: {id: admin._id, name: admin.username, email: admin.email},
        })
    } catch (error) {
        console.error("Error in Login Controller",error);
        res.status(500).json({message: error.message})
    }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
    console.log("Logout Successful!");
    res.status(200).json({ message: "Logout successful!" });

  } catch (error) {
    console.error("Error in Logout Controller", error);
    res.status(500).json({ message: error.message });
  }
};
