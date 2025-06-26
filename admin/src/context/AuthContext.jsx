import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: token on mount', token);
    if (token) {
      // Optionally fetch user profile with token
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          console.log('AuthContext: /api/auth/me status', res.status);
          return res.json().then(data => ({ status: res.status, data }));
        })
        .then(({ status, data }) => {
          console.log('AuthContext: /api/auth/me response', data);
          if (status === 200 && data && (data._id || data.id)) {
            setUser(data);
            console.log('AuthContext: setUser', data);
          } else {
            setUser(null);
            console.log('AuthContext: setUser(null)');
          }
          setLoading(false);
        })
        .catch((err) => {
          setUser(null);
          setLoading(false);
          console.log('AuthContext: fetch error', err);
        });
    } else {
      setUser(null);
      setLoading(false);
      console.log('AuthContext: no token, setUser(null)');
    }
  }, [token]);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 