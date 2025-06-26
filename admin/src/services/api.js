import { useAuth } from '../context/AuthContext';

// Use '' for VITE_API_BASE_URL in dev (Vite proxy), or full URL in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// IMPORTANT: In API calls, use only the path after /api (e.g., '/users/list'), not '/api/users/list'
export const useApi = () => {
  const { token } = useAuth();

  const request = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
    // Prefix with API_BASE_URL if url starts with '/'
    const fullUrl = url.startsWith('/') ? `${API_BASE_URL}${url}` : url;
    const res = await fetch(fullUrl, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'API error');
    return data;
  };

  return { request };
}; 