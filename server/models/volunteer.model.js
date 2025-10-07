import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    unique: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  ZIP: {
    type: String,
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
  // optional: if you want to connect volunteers to events later
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
}, { timestamps: true });

volunteerSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;