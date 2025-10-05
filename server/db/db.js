import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connection Successful!");
    
    } catch (error) {
        console.error("Database Error: ",error);
    }
    
}

export default connectDB;
