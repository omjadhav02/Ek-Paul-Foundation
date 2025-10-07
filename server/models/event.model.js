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
        type: Date 
    },
    location: { 
        type: String 
    },
    images: {
        type: [
            {
                url: { type: String, required: true },
                public_id: { type: String, required: true },
            }
        ],
        default: [],
    },
    videos: {
        type: [
            {
            url: { type: String, required: true },
            public_id: { type: String, required: true },
            }
        ],
        default: [],
    },

  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
