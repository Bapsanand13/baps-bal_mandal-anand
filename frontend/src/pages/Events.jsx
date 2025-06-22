import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { eventsAPI } from '../services/api';

const Events = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const eventsPerPage = 6;

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventsData = await eventsAPI.getEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on selected filter
  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.category === filter || event.status === filter;
  });

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading events...</p>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for exciting spiritual, cultural, and educational events designed for our young community members.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleFilterChange('all')}
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
              onClick={() => handleFilterChange('upcoming')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                filter === 'upcoming'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-100'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => handleFilterChange('past')}
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
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <motion.div
                key={event._id || event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={event.image || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                    alt={event.title || 'Event'}
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title || 'Event Title'}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description || 'No description available'}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span>{formatDate(event.date || event.startDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock size={16} />
                      <span>{event.time || event.startTime || 'TBD'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={16} />
                      <span>{event.venue || event.location || 'TBD'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users size={16} />
                      <span>
                        {event.attendees || 0}/{event.maxAttendees || event.capacity || '∞'} attendees
                      </span>
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-white text-gray-700 hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
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
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-white text-gray-700 hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events; 