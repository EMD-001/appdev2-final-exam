const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getAllEvents,
  createEvent,
  getMyEvents
} = require('../controllers/eventController');

router.get('/events', getAllEvents);

router.post('/events', auth, createEvent);

router.get('/my-events', auth, getMyEvents);

module.exports = router;
