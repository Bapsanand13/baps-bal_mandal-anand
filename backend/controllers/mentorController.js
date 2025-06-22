import Mentor from '../models/Mentor.js';

// @desc    Get all active mentors
// @route   GET /api/mentors
// @access  Public
export const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    res.json(mentors);
  } catch (error) {
    console.error('Get mentors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single mentor
// @route   GET /api/mentors/:id
// @access  Public
export const getMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (error) {
    console.error('Get mentor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create mentor (Admin only)
// @route   POST /api/mentors
// @access  Private/Admin
export const createMentor = async (req, res) => {
  try {
    const { name, role, description, image, email, phone, specialization, experience } = req.body;

    const mentor = new Mentor({
      name,
      role,
      description,
      image,
      email,
      phone,
      specialization,
      experience
    });

    await mentor.save();

    res.status(201).json({
      message: 'Mentor created successfully',
      mentor
    });
  } catch (error) {
    console.error('Create mentor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update mentor (Admin only)
// @route   PUT /api/mentors/:id
// @access  Private/Admin
export const updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json({
      message: 'Mentor updated successfully',
      mentor
    });
  } catch (error) {
    console.error('Update mentor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete mentor (Admin only)
// @route   DELETE /api/mentors/:id
// @access  Private/Admin
export const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    console.error('Delete mentor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 