import Volunteer from "../models/volunteer.model.js";
import { volunteerApprovedTemplate } from "../utils/email-templates/approvedVolunteer.js";
import { volunteerVerificationTemplate } from "../utils/email-templates/volunteerVerification.js";
import { sendEmail } from "../utils/sendEmail.js";

// ✳️ Create a new volunteer (public)
export const createVolunteer = async (req, res) => {
  try {
    const { name, email, phone, city, state, ZIP, country, message } = req.body;

    // Prevent duplicate volunteer registrations
    const existingVolunteer = await Volunteer.findOne({ email, phone });

    if (existingVolunteer) {
      return res.status(400).json({
        success: false,
        message: "A volunteer with this email/phone already exists.",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      city,
      state,
      ZIP,
      country,
      message,
      otp,
      otpExpiry,

    });

    const html = volunteerVerificationTemplate(name, otp);

    await sendEmail(email, "Email Verification - Ek Paul Foundation ",html);

    res.status(201).json({
      success: true,
      message: "Please verify your email. Check your inbox for the OTP.",
      data: volunteer,
    });
  } catch (error) {
    console.error("Error creating volunteer:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyVolunteerEmail = async (req, res) => {
    try {
    const { email, otp } = req.body;
    const volunteer = await Volunteer.findOne({ email });

    if (!volunteer) {
      return res.status(404).json({ success: false, message: "Volunteer not found" });
    }

    // Check OTP expiry
    if (Date.now() > volunteer.otpExpiry) {
      await volunteer.deleteOne(); // delete expired volunteer
      return res.status(400).json({ success: false, message: "OTP expired. Please register again." });
    }

    // Check OTP match
    if (volunteer.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // Mark verified and clear OTP info
    volunteer.isVerified = true;
    volunteer.otp = null;
    volunteer.otpExpiry = null;
    await volunteer.save();

    res.status(200).json({ success: true, message: "Email verified successfully!" });

  } catch (error) {
    console.error("Error verifying volunteer OTP:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// ✳️ Get all volunteers (admin only)
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: volunteers });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✳️ Get single volunteer by ID (admin)
export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer)
      return res.status(404).json({ success: false, message: "Volunteer not found" });
    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✳️ Delete volunteer (admin)
export const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer)
      return res.status(404).json({ success: false, message: "Volunteer not found" });
    res.status(200).json({ success: true, message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateVolunteerStatus = async (req,res)=>{
    try {
        const { id } = req.params;
        const { status } = req.body;

        if(!["approved", "rejected"].includes(status)){
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }
        const volunteer = await Volunteer.findById(id);
        if(!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }

        volunteer.status = status;
        await volunteer.save();

        if( status === "approved"){
            await sendEmail(
                volunteer.email,
                "Volunteer Approved - Ek Paul Foundation",
                volunteerApprovedTemplate(volunteer.name)
            )
        }

        res.status(200).json({ success: true, message: `Volunteer ${status} successfully`, data: volunteer });
    } catch (error) {
         console.error("Error approving volunteer:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}