import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  visitType: { 
    type: String, 
    enum: ["School", "Orphanage", "Community", "Other"], 
    default: "School",
  },
  location: { type: String },
  visitDate: { type: Date, required: true },
  volunteer: { type: String },

  // Updated to store both URL and Cloudinary public_id
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

  itemsProvided: [
    {
      itemName: { type: String },
      quantity: { type: Number },
      category: { type: String },
      costPerUnit: { type: Number }, // e.g. ₹50 per book
      totalCost: { type: Number }    // auto = quantity * costPerUnit
    }
  ],
  totalItemsCost: { type: Number },
  packagingCost: { type: Number },
  transportationCost: { type: Number },
  otherExpenses: { type: Number },
  totalVisitCost: { type: Number },
  notes: { type: String }
}, { timestamps: true });

// Pre-save hook to calculate total costs
visitSchema.pre("save", function(next) {
  this.itemsProvided.forEach(item => {
    item.totalCost = (item.quantity || 0) * (item.costPerUnit || 0);
  });

  const itemsTotal = this.itemsProvided.reduce((acc, item) => acc + (item.totalCost || 0), 0);
  this.totalItemsCost = itemsTotal;
  this.totalVisitCost = itemsTotal +
    (this.packagingCost || 0) +
    (this.transportationCost || 0) +
    (this.otherExpenses || 0);

  next();
});

const Visit = mongoose.model("Visits", visitSchema);

export default Visit;
