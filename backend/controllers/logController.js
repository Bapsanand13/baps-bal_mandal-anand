import Log from '../models/Log.js';

// List/filter logs (Admin only)
export const listLogs = async (req, res) => {
  try {
    const { action, performedBy, target, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (action) filter.action = action;
    if (performedBy) filter.performedBy = performedBy;
    if (target) filter.target = target;
    const logs = await Log.find(filter)
      .populate('performedBy', 'name email role')
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Log.countDocuments(filter);
    res.json({ logs, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    console.error('List logs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 