import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit, 
  Save, 
  X, 
  Camera, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Users,
  FileText,
  Heart,
  Trash2,
  Settings,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'Rahul Patel',
    email: 'rahul.patel@example.com',
    age: 12,
    mandal: 'Kishore Mandal',
    guardianName: 'Rajesh Patel',
    phone: '+91 98765 43210',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    joinDate: '2023-01-15',
    sevaRole: 'Sabha Coordinator'
  });

  const [editData, setEditData] = useState({ ...userData });

  // Sample user posts
  const userPosts = [
    {
      id: 1,
      content: 'Today I learned about the importance of seva in our spiritual journey. It\'s amazing how helping others brings so much joy! 🙏✨',
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      content: 'My drawing for the spiritual art competition. I tried to capture the peace and harmony that I feel during our mandal activities. 🎨🕉️',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      likes: 31,
      comments: 12,
      timestamp: '5 hours ago'
    }
  ];

  // Sample events joined
  const eventsJoined = [
    {
      id: 1,
      title: 'Bhagavad Gita Competition',
      date: '2024-02-15',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Cultural Performance Night',
      date: '2024-02-20',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Annual Sports Day',
      date: '2024-01-30',
      status: 'completed'
    }
  ];

  const handleEdit = () => {
    setEditData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePost = (postId) => {
    // Here you would typically make an API call to delete the post
    console.log('Deleting post:', postId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Profile Photo */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={isEditing ? editData.photo : userData.photo}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-orange-200"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors duration-200">
                      <Camera size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                  {isEditing ? editData.name : userData.name}
                </h2>
                <p className="text-orange-600 font-medium">{userData.mandal}</p>
              </div>

              {/* Profile Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{userData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{userData.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Age: {userData.age} years</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Guardian: {userData.guardianName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Joined: {formatDate(userData.joinDate)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Seva Role: {userData.sevaRole}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {isEditing ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center space-x-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center justify-center space-x-2 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                  >
                    <Edit size={16} />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'profile'
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'posts'
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    My Posts
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'events'
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Events Joined
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                          <input
                            type="number"
                            name="age"
                            value={editData.age}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mandal</label>
                          <select
                            name="mandal"
                            value={editData.mandal}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="Bal Mandal (5-8 years)">Bal Mandal (5-8 years)</option>
                            <option value="Kishore Mandal (9-12 years)">Kishore Mandal (9-12 years)</option>
                            <option value="Balika Mandal (5-8 years)">Balika Mandal (5-8 years)</option>
                            <option value="Kishori Mandal (9-12 years)">Kishori Mandal (9-12 years)</option>
                            <option value="Parent/Guardian">Parent/Guardian</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-600">Click "Edit Profile" to modify your information.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'posts' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">My Posts</h3>
                    <div className="space-y-4">
                      {userPosts.map((post) => (
                        <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <img
                                src={userData.photo}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-800">{userData.name}</h4>
                                <p className="text-sm text-gray-500">{post.timestamp}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-gray-700 mb-3">{post.content}</p>
                          {post.image && (
                            <img
                              src={post.image}
                              alt="Post"
                              className="w-full rounded-lg mb-3"
                            />
                          )}
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Heart size={16} />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FileText size={16} />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'events' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Events Joined</h3>
                    <div className="space-y-4">
                      {eventsJoined.map((event) => (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800">{event.title}</h4>
                              <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              event.status === 'upcoming'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Account Actions */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Settings size={16} />
                  <span>Account Settings</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 