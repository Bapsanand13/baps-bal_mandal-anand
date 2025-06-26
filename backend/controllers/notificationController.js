import Notification from '../models/Notification.js';
import User from '../models/User.js';

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { recipient: req.user.userId },
        { type: 'announcement' }
      ]
    })
    .populate('sender', 'name')
    .populate('recipient', 'name')
    .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single notification
// @route   GET /api/notifications/:id
// @access  Private
export const getNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate('sender', 'name')
      .populate('recipient', 'name');

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Check if user has access to this notification
    if (notification.recipient && notification.recipient._id.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(notification);
  } catch (error) {
    console.error('Get notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create notification (Admin only)
// @route   POST /api/notifications
// @access  Private/Admin
export const createNotification = async (req, res) => {
  try {
    const { title, message, type, recipientId, priority } = req.body;

    let notificationData = {
      title,
      message,
      type,
      priority: priority || 'normal',
      sender: req.user.userId
    };

    // If recipient is specified, send to specific user
    if (recipientId) {
      notificationData.recipient = recipientId;
    }

    const notification = new Notification(notificationData);
    await notification.save();

    const populatedNotification = await Notification.findById(notification._id)
      .populate('sender', 'name')
      .populate('recipient', 'name');

    res.status(201).json({
      message: 'Notification created successfully',
      notification: populatedNotification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update notification
// @route   PUT /api/notifications/:id
// @access  Private/Admin
export const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Only admin can update notifications
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('sender', 'name')
     .populate('recipient', 'name');

    res.json({
      message: 'Notification updated successfully',
      notification: updatedNotification
    });
  } catch (error) {
    console.error('Update notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private/Admin
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Only admin can delete notifications
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Check if user has access to this notification
    if (notification.recipient && notification.recipient.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    res.json({
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        $or: [
          { recipient: req.user.userId },
          { type: 'announcement' }
        ],
        isRead: false
      },
      {
        isRead: true,
        readAt: new Date()
      }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get unread count
// @route   GET /api/notifications/unread-count
// @access  Private
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      $or: [
        { recipient: req.user.userId },
        { type: 'announcement' }
      ],
      isRead: false
    });

    res.json({ unreadCount: count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send announcement to all users (Admin only)
// @route   POST /api/notifications/announcement
// @access  Private/Admin
export const sendAnnouncement = async (req, res) => {
  try {
    const { title, message, priority } = req.body;

    const notification = new Notification({
      title,
      message,
      type: 'announcement',
      priority: priority || 'normal',
      sender: req.user.userId
    });

    await notification.save();

    const populatedNotification = await Notification.findById(notification._id)
      .populate('sender', 'name');

    res.status(201).json({
      message: 'Announcement sent successfully',
      notification: populatedNotification
    });
  } catch (error) {
    console.error('Send announcement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send notification (Admin only)
export const sendNotification = async (req, res) => {
  try {
    // Integrate with SMS/Push/Email here
    res.json({ message: 'Notification sent (stub)' });
  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// List/filter notifications (Admin only)
export const listNotifications = async (req, res) => {
  try {
    const { type, user, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (user) filter.recipient = user;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    const notifications = await Notification.find(filter)
      .populate('recipient', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Notification.countDocuments(filter);
    res.json({ notifications, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    console.error('List notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User notifications (Admin/User)
export const userNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('User notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 