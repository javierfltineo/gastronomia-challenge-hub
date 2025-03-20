
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, ChefHat, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-20 pt-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold font-poppins text-gastro-brown tracking-tight">
                Gastronomía
              </span>
              <span className="px-1.5 py-0.5 bg-gastro-orange text-white text-xs rounded-md font-medium">
                en competencia
              </span>
            </Link>
            <p className="text-sm text-gray-600 mb-6">
              Descubre los concursos gastronómicos más populares y vota por tus restaurantes favoritos en nuestra plataforma dedicada a la excelencia culinaria.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gastro-peach hover:bg-gastro-orange-soft transition-colors" 
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-gastro-brown" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gastro-peach hover:bg-gastro-orange-soft transition-colors" 
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-gastro-brown" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gastro-peach hover:bg-gastro-orange-soft transition-colors" 
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-gastro-brown" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-4 font-poppins text-gastro-brown">Enlaces Rápidos</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-gastro-orange transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/competitions" className="text-sm text-gray-600 hover:text-gastro-orange transition-colors">
                  Concursos
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-gastro-orange transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-600 hover:text-gastro-orange transition-colors">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-md font-semibold mb-4 font-poppins text-gastro-brown">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gastro-orange transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-gastro-orange transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-gray-600 hover:text-gastro-orange transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-md font-semibold mb-4 font-poppins text-gastro-brown">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gastro-peach text-gastro-brown">
                  <Mail size={16} />
                </div>
                <span className="text-sm text-gray-600">info@gastronomiaencompetencia.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gastro-peach text-gastro-brown">
                  <Phone size={16} />
                </div>
                <span className="text-sm text-gray-600">+34 912 345 678</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gastro-peach text-gastro-brown">
                  <ChefHat size={16} />
                </div>
                <span className="text-sm text-gray-600">Madrid, España</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="py-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Gastronomía en Competencia. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            Diseñado con <span className="text-gastro-orange">♥</span> para amantes de la gastronomía
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
