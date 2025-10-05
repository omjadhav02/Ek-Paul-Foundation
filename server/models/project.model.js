import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required:true,
    },
    image:{
        type: String,
    },
    goalAmount: {
        type: Number,
        default: 0,
    },
    raisedAmount: {
        type: Number,
        default: 0,
    },
    catrgory: {
        type: String,
    },
    status:{
        type: String,
        enum: ["On-Going","Completed","Up-Coming"],
    },
    startdate: {
        type: Date,
    },
    endDate: {
        type: Date
    }
},{timestamps: true})

const Project = mongoose.model("Project", projectSchema);

export default Project;