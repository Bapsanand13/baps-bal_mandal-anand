import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Events = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Bhagavad Gita Competition',
      date: '2024-02-15',
      time: '10:00 AM',
      venue: 'BAPS Temple Hall',
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Annual Bhagavad Gita recitation and understanding competition for all age groups.',
      category: 'upcoming',
      attendees: 45,
      maxAttendees: 60
    },
    {
      id: 2,
      title: 'Cultural Performance Night',
      date: '2024-02-20',
      time: '6:00 PM',
      venue: 'Community Center',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'An evening of classical dance, music, and drama performances by our talented children.',
      category: 'upcoming',
      attendees: 32,
      maxAttendees: 50
    },
    {
      id: 3,
      title: 'Spiritual Workshop',
      date: '2024-02-10',
      time: '2:00 PM',
      venue: 'BAPS Library',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Interactive workshop on spiritual values and moral teachings.',
      category: 'past',
      attendees: 28,
      maxAttendees: 40
    },
    {
      id: 4,
      title: 'Drawing Competition',
      date: '2024-02-25',
      time: '11:00 AM',
      venue: 'Art Room',
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Creative drawing competition with spiritual themes.',
      category: 'upcoming',
      attendees: 18,
      maxAttendees: 30
    },
    {
      id: 5,
      title: 'Annual Sports Day',
      date: '2024-01-30',
      time: '9:00 AM',
      venue: 'Sports Ground',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Annual sports competition with various athletic events.',
      category: 'past',
      attendees: 55,
      maxAttendees: 80
    },
    {
      id: 6,
      title: 'Parent-Child Workshop',
      date: '2024-03-05',
      time: '3:00 PM',
      venue: 'Conference Hall',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Special workshop for parents and children to strengthen family bonds.',
      category: 'upcoming',
      attendees: 12,
      maxAttendees: 25
    }
  ];

  // Filter events based on selected filter
  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.category === filter;
  });

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isEventFull = (event) => {
    return event.attendees >= event.maxAttendees;
  };

  const getEventStatus = (event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    if (eventDate < today) return 'past';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for exciting spiritual, cultural, and educational events designed for our young community members.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                filter === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              }`}
            >
              <Filter size={16} />
              <span>All Events</span>
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                filter === 'upcoming'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-100'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                filter === 'past'
                  ? 'bg-gray-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  getEventStatus(event) === 'upcoming' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {getEventStatus(event) === 'upcoming' ? 'Upcoming' : 'Past'}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar size={16} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin size={16} />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users size={16} />
                    <span>{event.attendees}/{event.maxAttendees} attendees</span>
                  </div>
                </div>

                {getEventStatus(event) === 'upcoming' && (
                  <button
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                      isEventFull(event)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                    disabled={isEventFull(event)}
                  >
                    {isEventFull(event) ? 'Event Full' : 'Join Event'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-white text-gray-700 hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-white text-gray-700 hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* No Events Message */}
        {currentEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'There are no events scheduled at the moment.' 
                : `No ${filter} events found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events; 