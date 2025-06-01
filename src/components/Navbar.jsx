import React, { useState } from 'react';
import { Home, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ active }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl md:text-3xl font-bold hover:opacity-80 transition-opacity">
          <span className="inline-block">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text  text-transparent">β</span>
            <span className="text-white">ill</span>
          </span>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">E</span>
          <span className="text-white">asy</span>
        </a>

        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="/" 
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                active === 'home' 
                  ? 'bg-white/5 text-blue-200' 
                  : 'text-blue-300 hover:bg-white/5'
              }`}
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </a>

            <button 
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-blue-300 hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        )}

        {isAuthenticated && (
          <button 
            className="md:hidden p-2 bg-white/5 border border-white/10 rounded-lg text-blue-300 hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        {/* Mobile Menu - Only show when authenticated */}
        {isAuthenticated && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-3xl border-t border-white/10 md:hidden">
            <div className="p-4 space-y-2">
              <a 
                href="/" 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  active === 'home' 
                    ? 'bg-white/5 text-blue-200' 
                    : 'text-blue-300 hover:bg-white/5'
                }`}
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </a>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-blue-300 hover:bg-white/5 rounded-lg"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;