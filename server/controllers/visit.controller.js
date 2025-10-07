import Visit from "../models/visit.model.js";

// Add a new visit
export const addVisit = async (req, res) => {
  try {
    // Destructure fields from request body
    const {
      visitType,
      location,
      visitDate,
      volunteer,
      itemsProvided,
      packagingCost,
      transportationCost,
      otherExpenses,
      notes
    } = req.body;

    // Handle uploaded images and videos (from multer + cloudinary)
    const images = req.files?.images?.map(file => file.path) || [];
    const videos = req.files?.videos?.map(file => file.path) || [];

    // Create the new Visit document
    const newVisit = new Visit({
      visitType,
      location,
      visitDate,
      volunteer,
      itemsProvided: typeof itemsProvided === 'string' ? JSON.parse(itemsProvided) : itemsProvided,
      packagingCost: packagingCost || 0,
      transportationCost: transportationCost || 0,
      otherExpenses: otherExpenses || 0,
      notes,
      images,
      videos: videos
    });

    // Save to DB (pre-save hook will calculate totals automatically)
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: 'Visit added successfully!',
      data: newVisit
    });
  } catch (error) {
    console.error('Add Visit Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// ✅ Get all visits (with optional filters)
export const getAllVisits = async (req, res) => {
  try {
    const { month, year, type } = req.query; // optional filters
    const filter = {};

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      filter.visitDate = { $gte: start, $lte: end };
    } else if (year) {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31, 23, 59, 59);
      filter.visitDate = { $gte: start, $lte: end };
    }

    if (type) filter.visitType = type;

    const visits = await Visit.find(filter).sort({ visitDate: -1 });
    res.status(200).json({ success: true, visits });
  } catch (error) {
    console.error("Get Visits Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get single visit by ID
export const getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) return res.status(404).json({ success: false, message: "Visit not found" });
    res.status(200).json({ success: true, visit });
  } catch (error) {
    console.error("Get Visit By ID Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update a visit
export const updateVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!visit) return res.status(404).json({ success: false, message: "Visit not found" });
    res.status(200).json({ success: true, message: "Visit updated", visit });
  } catch (error) {
    console.error("Update Visit Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Delete a visit
export const deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) return res.status(404).json({ success: false, message: "Visit not found" });
    res.status(200).json({ success: true, message: "Visit deleted successfully" });
  } catch (error) {
    console.error("Delete Visit Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
