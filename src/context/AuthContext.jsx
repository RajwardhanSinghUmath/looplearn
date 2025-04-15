// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const savedUser = localStorage.getItem('user');
    
    if (loggedIn && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email) => {
    // In a real app, this would validate credentials against a backend
    // and store a JWT token
    const userData = {
      name: email.split('@')[0], // Use email username as name
      username: email.split('@')[0].toLowerCase(),
      email,
      bio: 'No bio yet',
      followers: 0,
      following: 0,
      joinedDate: new Date().toLocaleDateString(),
      profilePic: null
    };

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    
    return true;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}