import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Trophy, 
  Award,
  Play,
  Heart
} from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAchievement, setCurrentAchievement] = useState(0);

  // Hero slider data
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

  // Sample balak data
  const balakData = [
    {
      id: 1,
      name: 'Rahul Patel',
      age: 12,
      mandal: 'Kishore Mandal',
      grade: '7th Grade',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 10,
      mandal: 'Balika Mandal',
      grade: '5th Grade',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  ];

  // Sample parent data
  const parentData = [
    {
      id: 1,
      guardianName: 'Rajesh Patel',
      contact: '+91 98765 43210',
      sevaRole: 'Sabha Coordinator',
      childName: 'Rahul Patel'
    },
    {
      id: 2,
      guardianName: 'Sunita Sharma',
      contact: '+91 98765 43211',
      sevaRole: 'Cultural Committee',
      childName: 'Priya Sharma'
    }
  ];

  // Sample achievements
  const achievements = [
    {
      id: 1,
      title: 'Bhagavad Gita Competition',
      description: 'First Prize in Regional Level',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 2,
      title: 'Cultural Performance',
      description: 'Best Dance Performance Award',
      icon: Star,
      color: 'text-blue-500'
    },
    {
      id: 3,
      title: 'Academic Excellence',
      description: 'Top 10 in School',
      icon: Award,
      color: 'text-green-500'
    }
  ];

  // Sample talent show videos
  const talentVideos = [
    {
      id: 1,
      title: 'Classical Dance Performance',
      performer: 'Priya Sharma',
      thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      likes: 45
    },
    {
      id: 2,
      title: 'Bhajan Singing',
      performer: 'Rahul Patel',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      likes: 32
    },
    {
      id: 3,
      title: 'Drawing Competition',
      performer: 'Aarav Mehta',
      thumbnail: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      likes: 28
    }
  ];

  // Auto-rotate hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Auto-rotate achievements
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAchievement((prev) => (prev + 1) % achievements.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [achievements.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
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
        {/* Balak & Parent Info Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Our Community
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Balak Info Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-orange-600 mb-6">Balak Information</h3>
              {balakData.map((balak) => (
                <motion.div
                  key={balak.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={balak.photo}
                      alt={balak.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{balak.name}</h4>
                      <p className="text-gray-600">Age: {balak.age} years</p>
                      <p className="text-gray-600">Mandal: {balak.mandal}</p>
                      <p className="text-gray-600">Grade: {balak.grade}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Parent Info Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-orange-600 mb-6">Parent Information</h3>
              {parentData.map((parent) => (
                <motion.div
                  key={parent.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                  whileHover={{ y: -2 }}
                >
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-800">{parent.guardianName}</h4>
                    <p className="text-gray-600">Child: {parent.childName}</p>
                    <p className="text-gray-600">Contact: {parent.contact}</p>
                    <p className="text-gray-600">Seva Role: {parent.sevaRole}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Carousel */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Recent Achievements
          </h2>
          <div className="relative h-64 bg-white rounded-lg shadow-lg overflow-hidden">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  className={`absolute inset-0 flex items-center justify-center ${
                    index === currentAchievement ? 'opacity-100' : 'opacity-0'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentAchievement ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center">
                    <Icon className={`w-16 h-16 mx-auto mb-4 ${achievement.color}`} />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                    <p className="text-lg text-gray-600">{achievement.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Talent Show Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Talent Show Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {talentVideos.map((video) => (
              <motion.div
                key={video.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                whileHover={{ y: -4 }}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-200">
                    <Play className="w-12 h-12 text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{video.title}</h3>
                  <p className="text-gray-600 mb-2">by {video.performer}</p>
                  <div className="flex items-center space-x-1 text-red-500">
                    <Heart size={16} />
                    <span className="text-sm">{video.likes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 