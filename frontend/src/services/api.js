const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  // Register new user
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Login user
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  // Get current user
  getMe: () => apiRequest('/auth/me'),
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: () => apiRequest('/users/profile'),

  // Update user profile
  updateProfile: (profileData) => apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),

  // Get all users (admin only)
  getAllUsers: () => apiRequest('/users'),

  // Update user role (admin only)
  updateUserRole: (userId, role) => apiRequest(`/users/${userId}/role`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  }),
};

// Events API
export const eventsAPI = {
  // Get all events
  getEvents: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/events${queryString ? `?${queryString}` : ''}`);
  },

  // Get single event
  getEvent: (eventId) => apiRequest(`/events/${eventId}`),

  // Create event (admin only)
  createEvent: (eventData) => apiRequest('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),

  // Update event (admin only)
  updateEvent: (eventId, eventData) => apiRequest(`/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  }),

  // Delete event (admin only)
  deleteEvent: (eventId) => apiRequest(`/events/${eventId}`, {
    method: 'DELETE',
  }),

  // RSVP to event
  rsvpEvent: (eventId) => apiRequest(`/events/${eventId}/rsvp`, {
    method: 'POST',
  }),

  // Cancel RSVP
  cancelRsvp: (eventId) => apiRequest(`/events/${eventId}/rsvp`, {
    method: 'DELETE',
  }),
};

// Posts API
export const postsAPI = {
  // Get all posts
  getPosts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/posts${queryString ? `?${queryString}` : ''}`);
  },

  // Get single post
  getPost: (postId) => apiRequest(`/posts/${postId}`),

  // Create post
  createPost: (postData) => apiRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  }),

  // Update post
  updatePost: (postId, postData) => apiRequest(`/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  }),

  // Delete post
  deletePost: (postId) => apiRequest(`/posts/${postId}`, {
    method: 'DELETE',
  }),

  // Like/unlike post
  toggleLike: (postId) => apiRequest(`/posts/${postId}/like`, {
    method: 'POST',
  }),

  // Add comment
  addComment: (postId, comment) => apiRequest(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content: comment }),
  }),

  // Delete comment
  deleteComment: (postId, commentId) => apiRequest(`/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
  }),

  // Get pending posts (admin only)
  getPendingPosts: () => apiRequest('/posts/pending'),

  // Moderate post (admin only)
  moderatePost: (postId, status, reason) => apiRequest(`/posts/${postId}/moderate`, {
    method: 'PUT',
    body: JSON.stringify({ status, reason }),
  }),
};

// Notifications API
export const notificationsAPI = {
  // Get all notifications
  getNotifications: () => apiRequest('/notifications'),

  // Get single notification
  getNotification: (notificationId) => apiRequest(`/notifications/${notificationId}`),

  // Create notification (admin only)
  createNotification: (notificationData) => apiRequest('/notifications', {
    method: 'POST',
    body: JSON.stringify(notificationData),
  }),

  // Update notification (admin only)
  updateNotification: (notificationId, notificationData) => apiRequest(`/notifications/${notificationId}`, {
    method: 'PUT',
    body: JSON.stringify(notificationData),
  }),

  // Delete notification (admin only)
  deleteNotification: (notificationId) => apiRequest(`/notifications/${notificationId}`, {
    method: 'DELETE',
  }),

  // Mark notification as read
  markAsRead: (notificationId) => apiRequest(`/notifications/${notificationId}/read`, {
    method: 'PUT',
  }),

  // Mark all notifications as read
  markAllAsRead: () => apiRequest('/notifications/read-all', {
    method: 'PUT',
  }),

  // Get unread count
  getUnreadCount: () => apiRequest('/notifications/unread-count'),

  // Send announcement (admin only)
  sendAnnouncement: (announcementData) => apiRequest('/notifications/announcement', {
    method: 'POST',
    body: JSON.stringify(announcementData),
  }),
};

// File upload API
export const uploadAPI = {
  // Upload image to Cloudinary
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  },
};

export default {
  auth: authAPI,
  user: userAPI,
  events: eventsAPI,
  posts: postsAPI,
  notifications: notificationsAPI,
  upload: uploadAPI,
}; 