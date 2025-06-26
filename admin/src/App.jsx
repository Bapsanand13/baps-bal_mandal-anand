import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Attendance from './pages/Attendance';
import Events from './pages/Events';
import Posts from './pages/Posts';
import Achievements from './pages/Achievements';
import Notifications from './pages/Notifications';
import Logs from './pages/Logs';
import Profile from './pages/Profile';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="users" element={<Users />} />
                      <Route path="attendance" element={<Attendance />} />
                      <Route path="events" element={<Events />} />
                      <Route path="posts" element={<Posts />} />
                      <Route path="achievements" element={<Achievements />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="logs" element={<Logs />} />
                      <Route path="profile/:id" element={<Profile />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/admin/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}
