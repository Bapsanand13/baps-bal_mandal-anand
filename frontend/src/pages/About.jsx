import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Users, 
  Heart, 
  BookOpen, 
  Music,
  Award,
  Target,
  Loader2
} from 'lucide-react';
import { mentorsAPI } from '../services/api';

const About = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch mentors from backend
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        setError(null);
        const mentorsData = await mentorsAPI.getMentors();
        setMentors(mentorsData);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Failed to load mentors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const activities = [
    {
      id: 1,
      title: 'Spiritual Learning',
      description: 'Regular classes on Bhagavad Gita, Ramayana, and spiritual values.',
      icon: BookOpen,
      color: 'text-blue-500'
    },
    {
      id: 2,
      title: 'Cultural Activities',
      description: 'Classical dance, music, drama, and art competitions.',
      icon: Music,
      color: 'text-purple-500'
    },
    {
      id: 3,
      title: 'Seva Activities',
      description: 'Community service, charity work, and helping others.',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: 4,
      title: 'Sports & Games',
      description: 'Physical activities, sports competitions, and team building.',
      icon: Award,
      color: 'text-green-500'
    }
  ];

  const sevaOpportunities = [
    'Sabha Coordination',
    'Cultural Performance',
    'Library Management',
    'Event Organization',
    'Community Service',
    'Teaching Assistant',
    'Technical Support',
    'Social Media Management'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading about page...</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About BAPS Bal Mandal</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nurturing young minds with spiritual wisdom, cultural values, and moral teachings 
            to create responsible and compassionate future leaders.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <Target className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  BAPS Bal Mandal is dedicated to the holistic development of children through 
                  spiritual education, cultural enrichment, and character building. We believe 
                  that every child has the potential to become a beacon of light in society.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our mission is to instill values of dharma (righteousness), seva (selfless service), 
                  and bhakti (devotion) in young minds, preparing them to face life's challenges 
                  with wisdom and compassion.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Core Values</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Spiritual Growth & Learning</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Cultural Preservation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Character Development</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Community Service</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Friendship & Unity</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Activities Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Activities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${activity.color}`} />
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{activity.title}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Mentors Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Mentors</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {mentors.length > 0 ? (
              mentors.map((mentor, index) => (
                <motion.div
                  key={mentor._id || mentor.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <img
                    src={mentor.image || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                    alt={mentor.name || 'Mentor'}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {mentor.name || 'Mentor Name'}
                    </h3>
                    <p className="text-orange-600 font-medium mb-3">
                      {mentor.role || 'Mentor Role'}
                    </p>
                    <p className="text-gray-600">
                      {mentor.description || 'No description available'}
                    </p>
                    {mentor.experience && (
                      <p className="text-sm text-gray-500 mt-2">
                        Experience: {mentor.experience} years
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No mentors found</h3>
                <p className="text-gray-500">
                  Our mentor information will be available soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Temple Information */}
        <section className="mb-16">
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="BAPS Temple"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Temple Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Address</h3>
                      <p className="text-gray-600">
                        BAPS Swaminarayan Mandir<br />
                        123 Temple Road, City Center<br />
                        State, PIN Code
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Temple Timings</h3>
                      <p className="text-gray-600">
                        Morning: 6:00 AM - 12:00 PM<br />
                        Evening: 4:00 PM - 9:00 PM<br />
                        Sunday: 6:00 AM - 10:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Contact</h3>
                      <p className="text-gray-600">
                        Phone: +91 98765 43210<br />
                        Emergency: +91 98765 43211
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">
                        info@bapsbalmandal.com<br />
                        admin@bapsbalmandal.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Seva Opportunities */}
        <section className="mb-16">
          <motion.div
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg p-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Seva Opportunities</h2>
              <p className="text-xl opacity-90">
                Join us in serving the community and growing spiritually together
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sevaOpportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  className="bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-black" style={{ textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' }}>{opportunity}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Join Seva Team
              </button>
            </div>
          </motion.div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-6">
              Have questions about our activities or want to join our community? 
              We'd love to hear from you!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200">
                Contact Us
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                Visit Temple
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About; 