const Event = require('../models/Event');
const transporter = require('../config/nodemailer');
const pug = require('pug');
const path = require('path');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('userId', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

const createEvent = async (req, res) => {
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

    const html = pug.renderFile(
      path.join(__dirname, '../emails/eventCreated.pug'),
      {
        title: event.title,
        date: new Date(event.date).toDateString(),
        location: event.location
      }
    );

    await transporter.sendMail({
  from: process.env.SMTP_USER,      
  to: req.user.email || process.env.EMAIL_TO,
  subject: 'Event Created Successfully',
  html,
  });

    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create event', error: err.message });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your events', error: err.message });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getMyEvents
};
