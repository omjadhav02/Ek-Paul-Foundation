// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    date: { 
        type: Date, 
        // required: true 
    },
    location: { 
        type: String 
    },
    images: { 
        type: [String] ,
        default: [],
    },
    videos: {
        type: [String],
        default: [],
    }
  },
  { timestamps: true }
);

const Event =  mongoose.model("Event", eventSchema);

export default Event;