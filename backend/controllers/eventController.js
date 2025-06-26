import Event from '../models/Event.js';
import User from '../models/User.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query)
      .populate('organizer', 'name')
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name')
      .populate('attendees', 'name');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      category,
      maxAttendees,
      image
    } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      maxAttendees,
      image,
      organizer: req.user.userId
    });

    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('organizer', 'name');

    res.status(201).json({
      message: 'Event created successfully',
      event: populatedEvent
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is organizer or admin
    if (event.organizer.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('organizer', 'name');

    res.json({
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is organizer or admin
    if (event.organizer.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    RSVP to event
// @route   POST /api/events/:id/rsvp
// @access  Private
export const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event is full
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Check if user already RSVP'd
    if (event.attendees.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already RSVP\'d to this event' });
    }

    event.attendees.push(req.user.userId);
    await event.save();

    const updatedEvent = await Event.findById(req.params.id)
      .populate('organizer', 'name')
      .populate('attendees', 'name');

    res.json({
      message: 'RSVP successful',
      event: updatedEvent
    });
  } catch (error) {
    console.error('RSVP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Cancel RSVP
// @route   DELETE /api/events/:id/rsvp
// @access  Private
export const cancelRsvp = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user has RSVP'd
    if (!event.attendees.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Not RSVP\'d to this event' });
    }

    event.attendees = event.attendees.filter(
      attendee => attendee.toString() !== req.user.userId
    );
    await event.save();

    const updatedEvent = await Event.findById(req.params.id)
      .populate('organizer', 'name')
      .populate('attendees', 'name');

    res.json({
      message: 'RSVP cancelled successfully',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Cancel RSVP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send event reminder (stub)
export const sendEventReminder = async (req, res) => {
  try {
    // Integrate with notification system (SMS/Push/Email)
    res.json({ message: 'Event reminder sent (stub)' });
  } catch (error) {
    console.error('Send event reminder error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Event participation stats (for dashboard)
export const eventParticipationStats = async (req, res) => {
  try {
    const events = await Event.find();
    const stats = events.map(event => ({
      eventId: event._id,
      title: event.title,
      date: event.date,
      totalAttendees: event.attendees.length
    }));
    res.json(stats);
  } catch (error) {
    console.error('Event participation stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export event attendance (CSV/Excel-ready JSON)
export const exportEventAttendance = async (req, res) => {
  try {
    const { eventId } = req.query;
    const event = await Event.findById(eventId).populate('attendees', 'name email mandal');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ event: event.title, date: event.date, attendees: event.attendees });
  } catch (error) {
    console.error('Export event attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 