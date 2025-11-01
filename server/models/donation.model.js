import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true 
},
phone:{
    type: Number,
    required: true,
},
  amount: { 
    type: Number, 
    required: true 
}, // changed to Number
  message: { 
    type: String 
},
  paymentStatus: { 
    type: String, 
    enum: ["success","failed","pending"], 
    default: "pending" 
},
  transactionId: { 
    type: String 
},
  orderId: { 
    type: String 
}, // store Razorpay order_id
  projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project" 
}
}, { timestamps: true });

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
