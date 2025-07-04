import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreVertical,
  Upload,
  X,
  User,
  Loader2
} from 'lucide-react';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({
    content: '',
    image: null,
    imagePreview: null
  });
  const { user } = useAuth();

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const postsData = await postsAPI.getPosts();
        setPosts(postsData);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await postsAPI.toggleLike(postId);
      // Refresh posts after like
      const updatedPosts = await postsAPI.getPosts();
      setPosts(updatedPosts);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPost({
        ...newPost,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const removeImage = () => {
    setNewPost({
      ...newPost,
      image: null,
      imagePreview: null
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPost.content.trim() || newPost.image) {
      try {
        const formData = new FormData();
        formData.append('content', newPost.content);
        if (newPost.image) {
          formData.append('image', newPost.image);
        }

        await postsAPI.createPost(formData);
        
        // Refresh posts
        const updatedPosts = await postsAPI.getPosts();
        setPosts(updatedPosts);
        
        setNewPost({ content: '', image: null, imagePreview: null });
        setShowUploadForm(false);
      } catch (err) {
        console.error('Error creating post:', err);
        alert('Failed to create post. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Community Posts</h1>
          <p className="text-lg text-gray-600">
            Share your thoughts, experiences, and creative works with the community
          </p>
        </div>

        {/* Create Post Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowUploadForm(true)}
            className="w-full bg-white rounded-lg shadow-md p-4 text-left hover:shadow-lg transition-shadow duration-200 border-2 border-dashed border-orange-300 hover:border-orange-500"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-gray-600">Share something with the community...</span>
            </div>
          </button>
        </div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Create Post</h3>
                  <button
                    onClick={() => setShowUploadForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="What's on your mind?"
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={4}
                  />

                  {/* Image Upload */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Image (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="cursor-pointer bg-orange-100 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors duration-200 flex items-center space-x-2">
                        <Upload size={16} />
                        <span>Choose Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {newPost.imagePreview && (
                        <button
                          type="button"
                          onClick={removeImage}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    {newPost.imagePreview && (
                      <div className="mt-3 relative">
                        <img
                          src={newPost.imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowUploadForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <motion.div
                key={post._id || post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Post Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.author?.photo || post.authorImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'}
                        alt={post.author?.name || post.author || 'User'}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {post.author?.name || post.author || 'Community Member'}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.timestamp || 'Recently'}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-gray-800 mb-4">{post.content || 'No content'}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full rounded-lg mb-4"
                    />
                  )}
                </div>

                {/* Post Actions */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post._id || post.id)}
                        className={`flex items-center space-x-2 transition-colors duration-200 ${
                          post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
                        <span className="text-sm">{post.likes || 0}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                        <MessageCircle size={18} />
                        <span className="text-sm">{post.comments || 0}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors duration-200">
                        <Share2 size={18} />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Image size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-4">Be the first to share something with the community!</p>
              <button
                onClick={() => setShowUploadForm(true)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Create First Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts; 