import Event from "../models/Event.js";

// Helper function to calculate status
const calculateStatus = (eventDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDateObj = new Date(eventDate);
  eventDateObj.setHours(0, 0, 0, 0);

  if (eventDateObj > today) return "Upcoming";
  if (eventDateObj.getTime() === today.getTime()) return "Ongoing";
  return "Completed";
};

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EVENTS (Status calculated dynamically)
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    const updatedEvents = events.map((event) => ({
      ...event._doc,
      eventStatus: calculateStatus(event.eventDate),
    }));

    res.json(updatedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET EVENT BY ID (Status calculated dynamically)
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      ...event._doc,
      eventStatus: calculateStatus(event.eventDate),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      ...event._doc,
      eventStatus: calculateStatus(event.eventDate),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};