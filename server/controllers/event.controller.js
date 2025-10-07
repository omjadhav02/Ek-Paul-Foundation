import Event from "../models/event.model.js";

export const createEvent = async (req,res)=>{
    try {
        const {title, description, date, location} = req.body;
        const images = req.files?.images?.map(file => file.path) || [];
        const videos = req.files?.videos?.map(file => file.path) || [];

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
            message: 'Event added successfully!',
            data: event
        });;
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: error.message });
    }
}

export const getEvents = async(req, res)=>{
    try {
        const events = await Event.find().sort({date: -1});
        if(!events){
            return res.status(404).json({message: "No Event Found!"})
        }
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: error.message });
    }
}

export const getEventById = async(req,res)=>{
    try {
        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({message: "Event not Found"});
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ message: error.message });
    }
}

export const updateEvent = async (req,res)=>{
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!event){
            return res.status(404).json({message: "Event not Found!"});
        }
        res.status(200).json({message: "Event updated Successfully!"});
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteEvent = async (req,res)=>{
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event){
            return res.status(404).json({message: "event not found"});
        }
        res.status(200).json({message:"Event deleted Successfully!"})
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: error.message });
    }
}