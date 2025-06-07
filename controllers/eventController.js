const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  const events = await Event.find().populate('userId', 'name email');
  res.json(events);
};

exports.createEvent = async (req, res) => {
  try {
    const { title, location, date, description } = req.body;
    const event = new Event({
      title,
      location,
      date,
      description,
      userId: req.user._id
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create event' });
  }
};

exports.getMyEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user._id });
  res.json(events);
};

module.exports = {
  getAllEvents,
  createEvent,
  getMyEvents
};