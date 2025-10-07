import Event from "../models/event.model.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    // Map images & videos with { url, public_id }
    const images = req.files?.images?.map(file => ({
      url: file.path,
      public_id: file.filename || file.public_id
    })) || [];

    const videos = req.files?.videos?.map(file => ({
      url: file.path,
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

    res.status(200).json({ success: true, data: events });
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

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent)
      return res.status(404).json({ success: false, message: "Event not found" });

    res.status(200).json({
      success: true,
      message: "Event updated successfully!",
      data: updatedEvent,
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

