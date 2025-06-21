import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Posts from './pages/Posts';
import Notifications from './pages/Notifications';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import InstallApp from './pages/InstallApp';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/install" element={<InstallApp />} />
          {/* Add more routes as you build more pages */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
