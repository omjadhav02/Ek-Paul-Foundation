import Event from "../models/event.model.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    // Map images & videos with { url, public_id }
    const images = req.files?.images?.map(file => ({
      url: file.path || file.secure_url || file.url,
      public_id: file.filename || file.public_id
    })) || [];

    const videos = req.files?.videos?.map(file => ({
      url: file.path || file.secure_url || file.url,
      public_id: file.filename || file.public_id
    })) || [];

    const event = new Event({
      title,
      description,
      date,
      location,
      images,
      videos
    });

    await event.save();

    res.status(201).json({
      success: true,
      message: "Event added successfully!",
      data: event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    if (!events.length)
      return res.status(404).json({ success: false, message: "No events found" });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ success: false, message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Destructure form fields
    let { title, description, date, location, removeImages, removeVideos } = req.body;

    // Ensure removeImages/removeVideos are arrays
    const removeImagesArray = removeImages
      ? Array.isArray(removeImages) ? removeImages : [removeImages]
      : [];
    const removeVideosArray = removeVideos
      ? Array.isArray(removeVideos) ? removeVideos : [removeVideos]
      : [];

    // Function to delete media from Cloudinary
    const deleteFromCloudinary = async (mediaArray, type) => {
      if (!mediaArray?.length) return;
      for (const public_id of mediaArray) {
        if (public_id) {
          await cloudinary.uploader.destroy(public_id, { resource_type: type });
        }
      }
    };

    // Delete removed media
    await deleteFromCloudinary(removeImagesArray, "image");
    await deleteFromCloudinary(removeVideosArray, "video");

    // Filter out removed media from existing arrays
    const updatedImages = event.images.filter(img => !removeImagesArray.includes(img.public_id));
    const updatedVideos = event.videos.filter(vid => !removeVideosArray.includes(vid.public_id));

    // Add newly uploaded media
    const newImages = req.files?.images?.map(file => ({
      url: file.path || file.secure_url || file.url,
      public_id: file.filename || file.public_id
    })) || [];

    const newVideos = req.files?.videos?.map(file => ({
      url: file.path || file.secure_url || file.url,
      public_id: file.filename || file.public_id
    })) || [];

    // Update event fields
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.images = [...updatedImages, ...newImages];
    event.videos = [...updatedVideos, ...newVideos];

    // Save updated event
    await event.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully!",
      data: event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Delete Event (with proper Cloudinary cleanup)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ success: false, message: "Event not found" });

    // Function to delete media from Cloudinary
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

    // Separate deletions for images and videos
    await deleteFromCloudinary(event.images, "image");
    await deleteFromCloudinary(event.videos, "video");

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

