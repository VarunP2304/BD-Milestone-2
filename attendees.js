const express = require('express');
const Attendee = require('../models/attendee_model');
const PriorityQueue = require('./../utils/priorityQueue');

const router = express.Router();
const attendees = [];
const priorityQueue = new PriorityQueue();

// Validator Middleware
const validateAttendeeInput = (req, res, next) => {
    const { name, isVegetarian, isSpeaker, isVIP } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    if (typeof isVegetarian !== 'boolean' || typeof isSpeaker !== 'boolean' || typeof isVIP !== 'boolean') {
        return res.status(400).json({ error: 'isVegetarian, isSpeaker, and isVIP must be boolean values' });
    }
    next();
};

// Add an attendee
router.post('/add', validateAttendeeInput, (req, res) => {
    const { name, isVegetarian, isSpeaker, isVIP } = req.body;
    const newAttendee = new Attendee(name, isVegetarian, isSpeaker, isVIP);
    attendees.push(newAttendee);
    priorityQueue.insert(newAttendee);

    res.status(201).json({ message: 'RSVP received', attendee: newAttendee });
});

// Get all attendees (sorted by preferences)
router.get('/sort', (req, res) => {
    const sortedAttendees = attendees.sort((a, b) => {
        return b.isVIP - a.isVIP || b.isSpeaker - a.isSpeaker || b.isVegetarian - a.isVegetarian;
    });
    res.json({ attendees: sortedAttendees });
});

// Get attendees by priority
router.get('/priority', (req, res) => {
    const prioritizedAttendees = priorityQueue.getAttendeesInOrder();
    res.json({ attendees: prioritizedAttendees });
});

// Error Handling for Invalid Routes
router.all('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = router;
