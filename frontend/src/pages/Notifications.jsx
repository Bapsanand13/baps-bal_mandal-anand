import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Clock, 
  Star, 
  CheckCircle,
  AlertCircle,
  Info,
  Trash2
} from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Bhagavad Gita Competition Registration Open',
      description: 'Registration for the annual Bhagavad Gita competition is now open. All participants must register by February 10th, 2024.',
      type: 'important',
      date: '2024-02-01T10:00:00Z',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Cultural Performance Night Schedule',
      description: 'The cultural performance night will be held on February 20th at 6:00 PM. All participants please arrive 30 minutes early for rehearsal.',
      type: 'event',
      date: '2024-02-01T09:30:00Z',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'New Spiritual Workshop Series',
      description: 'We are starting a new series of spiritual workshops every Sunday. Topics will include meditation, yoga, and moral values.',
      type: 'info',
      date: '2024-01-30T15:00:00Z',
      isRead: true,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Annual Sports Day Results',
      description: 'Congratulations to all participants! The results of the annual sports day competition have been announced. Check the notice board for details.',
      type: 'success',
      date: '2024-01-29T14:00:00Z',
      isRead: true,
      priority: 'low'
    },
    {
      id: 5,
      title: 'Parent Meeting Reminder',
      description: 'Monthly parent meeting will be held this Saturday at 4:00 PM. All parents are requested to attend for important updates.',
      type: 'reminder',
      date: '2024-01-28T11:00:00Z',
      isRead: false,
      priority: 'high'
    },
    {
      id: 6,
      title: 'Library Hours Extended',
      description: 'The BAPS library will now be open from 9:00 AM to 8:00 PM on weekdays. Students can use this time for study and research.',
      type: 'info',
      date: '2024-01-27T16:00:00Z',
      isRead: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Auto-mark notifications as read when viewed
  useEffect(() => {
    const unreadNotifications = notifications.filter(n => !n.isRead);
    if (unreadNotifications.length > 0) {
      // Simulate auto-marking as read after 3 seconds
      const timer = setTimeout(() => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'important':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'event':
        return <Bell className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-orange-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  // Filter and sort notifications
  const filteredNotifications = notifications
    .filter(notification => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !notification.isRead;
      return notification.type === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Notifications</h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest announcements and important information
          </p>
        </div>

        {/* Stats and Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{notifications.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm"
                >
                  Mark All as Read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === 'unread'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('important')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === 'important'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Important
              </button>
              <button
                onClick={() => setFilter('event')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === 'event'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Events
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              className={`bg-white rounded-lg shadow-md border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.isRead ? 'ring-2 ring-orange-200' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`text-lg font-semibold ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{notification.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{formatDate(notification.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star size={14} />
                          <span className="capitalize">{notification.priority} priority</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                        title="Mark as read"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      title="Delete notification"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Bell size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'You\'re all caught up! No notifications at the moment.' 
                : `No ${filter} notifications found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 