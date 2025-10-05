import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const signup = async (req, res)=>{
    try {
        const { username, email, password } = req.body;

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

        await sendEmail(email, "Email Verifiation - Ek Paul Foundation ",`Your verification code is : ${otp}`)

        res.status(201).json({
            message: "Signup Successful!",
            adminId: admin._id, 
        });

        
    }catch (error) {
        console.error("Error in Signup Controller",error);
        res.status(500).json({message: error.message})
    }
}

export const verifyEmail = async (req,res)=>{
    try {
        const { otp } = req.body;

        const admin  = await Admin.findOne({otp});
        if(!admin){
            return res.status(404).josn({message: "Admin no found!"})
        }

        if(admin.isVerified){
            return res.status(400).json({message: "Already verified!"})
        }

        admin.isVerified = true;
        admin.otp = undefined;
        admin.otpExpiry = undefined;

        await admin.save();

        console.log("Email Verification Successful!");
        res.status(200).json({message: "Email Verification Successful!"})
    } catch (error) {
        console.error("Error in Verify Controller", error);
        res.status(500).json({ message: error.message });
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
