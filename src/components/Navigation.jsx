// src/components/Navigation.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const { isLoggedIn, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Hide the navigation on the Feed page for a cleaner look (showing only the tabs)
  if (location.pathname === '/') {
    return null;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-black border-b border-gray-800 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">LoopLearn</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6">
                <Link 
                  to="/" 
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === '/' 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Feed
                </Link>
                
               
                  
                    <Link 
  to={isLoggedIn ? "/profile" : "/login"}
  className={`px-3 py-2 text-sm font-medium transition-colors ${
    location.pathname === '/profile' 
      ? 'text-purple-400' 
      : 'text-gray-300 hover:text-white'
  }`}
>
  Profile
</Link>

{isLoggedIn && (
  <button 
    onClick={logout}
    className="ml-4 px-4 py-1.5 bg-gray-800 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
  >
    Logout
  </button>
)}

              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              type="button" 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
          <Link 
            to="/" 
            className={`block px-3 py-2 text-base font-medium rounded-md ${
              location.pathname === '/' 
                ? 'text-purple-400 bg-gray-800' 
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Feed
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link 
                to="/profile" 
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  location.pathname === '/profile' 
                    ? 'text-purple-400 bg-gray-800' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-md hover:from-purple-700 hover:to-pink-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;