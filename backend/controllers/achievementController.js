import Achievement from '../models/Achievement.js';

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
export const getAchievements = async (req, res) => {
  try {
    const { category, level, limit } = req.query;
    let query = { isActive: true };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by level
    if (level && level !== 'all') {
      query.level = level;
    }

    let achievementsQuery = Achievement.find(query)
      .populate('createdBy', 'name')
      .populate('participants.userId', 'name')
      .sort({ date: -1 });

    // Apply limit if specified
    if (limit) {
      achievementsQuery = achievementsQuery.limit(parseInt(limit));
    }

    const achievements = await achievementsQuery;

    res.json(achievements);
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single achievement
// @route   GET /api/achievements/:id
// @access  Public
export const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('participants.userId', 'name');

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json(achievement);
  } catch (error) {
    console.error('Get achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create achievement (Admin only)
// @route   POST /api/achievements
// @access  Private/Admin
export const createAchievement = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      category, 
      level, 
      position, 
      date, 
      participants, 
      image, 
      certificate 
    } = req.body;

    const achievement = new Achievement({
      title,
      description,
      category,
      level,
      position,
      date,
      participants,
      image,
      certificate,
      createdBy: req.user.userId
    });

    await achievement.save();

    const populatedAchievement = await Achievement.findById(achievement._id)
      .populate('createdBy', 'name')
      .populate('participants.userId', 'name');

    res.status(201).json({
      message: 'Achievement created successfully',
      achievement: populatedAchievement
    });
  } catch (error) {
    console.error('Create achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update achievement (Admin only)
// @route   PUT /api/achievements/:id
// @access  Private/Admin
export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate('createdBy', 'name')
    .populate('participants.userId', 'name');

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json({
      message: 'Achievement updated successfully',
      achievement
    });
  } catch (error) {
    console.error('Update achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete achievement (Admin only)
// @route   DELETE /api/achievements/:id
// @access  Private/Admin
export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Delete achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get recent achievements (for home page)
// @route   GET /api/achievements/recent
// @access  Public
export const getRecentAchievements = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const achievements = await Achievement.find({ isActive: true })
      .populate('createdBy', 'name')
      .populate('participants.userId', 'name')
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json(achievements);
  } catch (error) {
    console.error('Get recent achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify achievement (Admin only)
// @route   PUT /api/achievements/:id/verify
// @access  Private/Admin
export const verifyAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    )
      .populate('createdBy', 'name')
      .populate('participants.userId', 'name');
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json({ message: 'Achievement verified', achievement });
  } catch (error) {
    console.error('Verify achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reject achievement (Admin only)
// @route   PUT /api/achievements/:id/reject
// @access  Private/Admin
export const rejectAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
      .populate('createdBy', 'name')
      .populate('participants.userId', 'name');
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json({ message: 'Achievement rejected', achievement });
  } catch (error) {
    console.error('Reject achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get achievements for a specific user
// @route   GET /api/achievements/user/:userId
// @access  Private/Admin
export const userAchievements = async (req, res) => {
  try {
    const { userId } = req.params;
    const achievements = await Achievement.find({ 'participants.userId': userId })
      .populate('createdBy', 'name')
      .populate('participants.userId', 'name')
      .sort({ date: -1 });
    res.json(achievements);
  } catch (error) {
    console.error('User achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 