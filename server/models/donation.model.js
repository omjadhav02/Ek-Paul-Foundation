import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    amount:{
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    paymentStatus: {
        type: String,
        enum: ["success","failed","pending"],
        default: "pending",
    },
    transactionId: {
        type: String,
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project"
    }
},{timestamps: true})

const Donation = mongoose.model("Donation",donationSchema);

export default Donation;