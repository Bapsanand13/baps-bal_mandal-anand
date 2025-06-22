import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Trophy, 
  Award,
  Play,
  Heart,
  Loader2
} from 'lucide-react';
import { eventsAPI, postsAPI, achievementsAPI } from '../services/api';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAchievement, setCurrentAchievement] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for dynamic data
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [achievements, setAchievements] = useState([]);

  // Hero slider data (this can stay static as it's promotional content)
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Welcome to BAPS Bal Mandal',
      subtitle: 'Nurturing young minds with spiritual wisdom and cultural values'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Spiritual Learning & Growth',
      subtitle: 'Discover the path of dharma through interactive activities'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Community & Friendship',
      subtitle: 'Build lasting friendships while learning together'
    }
  ];

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch recent events
        const eventsData = await eventsAPI.getEvents({ limit: 3, status: 'upcoming' });
        setEvents(eventsData);
        
        // Fetch recent posts
        const postsData = await postsAPI.getPosts({ limit: 3 });
        setPosts(postsData);
        
        // Fetch recent achievements
        const achievementsData = await achievementsAPI.getRecentAchievements(5);
        setAchievements(achievementsData);
        
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-rotate hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Auto-rotate achievements
  useEffect(() => {
    if (achievements.length > 0) {
      const timer = setInterval(() => {
        setCurrentAchievement((prev) => (prev + 1) % achievements.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [achievements.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Helper function to get icon based on achievement category
  const getAchievementIcon = (category) => {
    switch (category) {
      case 'academic':
        return Award;
      case 'cultural':
        return Star;
      case 'sports':
        return Trophy;
      case 'spiritual':
        return Star;
      case 'community':
        return Heart;
      default:
        return Trophy;
    }
  };

  // Helper function to get color based on achievement level
  const getAchievementColor = (level) => {
    switch (level) {
      case 'international':
        return 'text-purple-500';
      case 'national':
        return 'text-red-500';
      case 'state':
        return 'text-blue-500';
      case 'regional':
        return 'text-green-500';
      case 'local':
        return 'text-yellow-500';
      default:
        return 'text-orange-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading community data...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl max-w-2xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-black p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-black p-2 rounded-full transition-all duration-200"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Achievements Carousel */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Recent Achievements
          </h2>
          {achievements.length > 0 ? (
            <div className="relative h-64 bg-white rounded-lg shadow-lg overflow-hidden">
              {achievements.map((achievement, index) => {
                const Icon = getAchievementIcon(achievement.category);
                return (
                  <motion.div
                    key={achievement._id || achievement.id}
                    className={`absolute inset-0 flex items-center justify-center ${
                      index === currentAchievement ? 'opacity-100' : 'opacity-0'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentAchievement ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center px-6">
                      <Icon className={`w-16 h-16 mx-auto mb-4 ${getAchievementColor(achievement.level)}`} />
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                      <p className="text-lg text-gray-600 mb-2">{achievement.description}</p>
                      {achievement.position && (
                        <p className="text-sm text-orange-600 font-medium">{achievement.position}</p>
                      )}
                      {achievement.participants && achievement.participants.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          Participants: {achievement.participants.map(p => p.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-lg">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No achievements yet</h3>
              <p className="text-gray-500">
                Our community achievements will be displayed here once they are added.
              </p>
            </div>
          )}
        </section>

        {/* Talent Show Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Recent Posts
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.slice(0, 3).map((post) => (
                <motion.div
                  key={post._id || post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative">
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                      alt={post.title || 'Post'}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-200">
                      <Play className="w-12 h-12 text-white" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {post.title || 'Community Post'}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      by {post.author?.name || post.author || 'Community Member'}
                    </p>
                    <div className="flex items-center space-x-1 text-red-500">
                      <Heart size={16} />
                      <span className="text-sm">{post.likes || 0}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                <p>No recent posts found</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 