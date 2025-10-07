import Visit from "../models/visit.model.js";
import cloudinary from "../config/cloudinary.js";

// ➕ Add Visit
export const addVisit = async (req, res) => {
  try {
    const {
      visitType,
      location,
      visitDate,
      volunteer,
      itemsProvided,
      packagingCost,
      transportationCost,
      otherExpenses,
      notes,
    } = req.body;

    const images = req.files?.images?.map(file => ({
      url: file.path,
      public_id: file.filename || file.public_id || file.path.split('/').pop().split('.')[0],
    })) || [];

    const videos = req.files?.videos?.map(file => ({
      url: file.path,
      public_id: file.filename || file.public_id || file.path.split('/').pop().split('.')[0],
    })) || [];

    const newVisit = new Visit({
      visitType,
      location,
      visitDate,
      volunteer,
      itemsProvided: typeof itemsProvided === "string" ? JSON.parse(itemsProvided) : itemsProvided,
      packagingCost: packagingCost || 0,
      transportationCost: transportationCost || 0,
      otherExpenses: otherExpenses || 0,
      notes,
      images,
      videos,
    });

    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "Visit added successfully!",
      data: newVisit,
    });
  } catch (error) {
    console.error("Add Visit Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// 📜 Get All Visits
export const getAllVisits = async (req, res) => {
  try {
    const { month, year, type } = req.query;
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

// 🔍 Get Visit by ID
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

// ✏️ Update Visit
export const updateVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!visit) return res.status(404).json({ success: false, message: "Visit not found" });
    res.status(200).json({ success: true, message: "Visit updated successfully", visit });
  } catch (error) {
    console.error("Update Visit Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Delete Visit (with proper Cloudinary cleanup)
export const deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit)
      return res.status(404).json({ success: false, message: "Visit not found" });

    // Helper to delete Cloudinary files
    const deleteFromCloudinary = async (mediaArray, type) => {
      if (!mediaArray?.length) return;
      for (const media of mediaArray) {
        if (media.public_id) {
          await cloudinary.uploader.destroy(media.public_id, {
            resource_type: type,
          });
        }
      }
    };

    // Delete both image & video files from Cloudinary
    await deleteFromCloudinary(visit.images, "image");
    await deleteFromCloudinary(visit.videos, "video");

    await visit.deleteOne();

    res.status(200).json({
      success: true,
      message: "Visit deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting visit:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

