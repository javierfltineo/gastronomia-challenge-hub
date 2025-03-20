
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { getCurrentUser, logout } from '../lib/data';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!getCurrentUser());
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-8 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="text-2xl font-bold font-poppins text-gastro-brown tracking-tight">
            Gastronomía
          </span>
          <span className="px-1.5 py-0.5 bg-gastro-orange text-white text-xs rounded-md font-medium">
            en competencia
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-gastro-orange transition-colors relative group"
          >
            <span>Inicio</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gastro-orange transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/competitions"
            className="text-sm font-medium text-gray-700 hover:text-gastro-orange transition-colors relative group"
          >
            <span>Concursos</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gastro-orange transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gastro-orange transition-colors">
                <User size={16} />
                <span>Mi Cuenta</span>
              </button>
              <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gastro-orange-soft hover:text-gastro-brown transition-colors"
                  >
                    Perfil
                  </Link>
                  <Link
                    to="/my-votes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gastro-orange-soft hover:text-gastro-brown transition-colors"
                  >
                    Mis Votos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gastro-orange-soft hover:text-gastro-brown transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gastro-orange rounded-md shadow-sm hover:bg-gastro-brown transition-colors"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-gastro-orange transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-8">
          <Link
            to="/"
            className="py-3 border-b border-gray-100 text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/competitions"
            className="py-3 border-b border-gray-100 text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Concursos
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="py-3 border-b border-gray-100 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Perfil
              </Link>
              <Link
                to="/my-votes"
                className="py-3 border-b border-gray-100 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Mis Votos
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="py-3 text-left text-lg font-medium text-gastro-orange"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mt-4 flex items-center justify-center px-4 py-3 text-white bg-gastro-orange rounded-md shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
