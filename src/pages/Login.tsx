
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { login } from '../lib/data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/';
  
  const [email, setEmail] = useState('user@example.com'); // Demo value
  const [password, setPassword] = useState('password'); // Demo value
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = login(email, password);
      
      if (user) {
        toast({
          title: "¡Inicio de sesión exitoso!",
          description: `Bienvenido/a de nuevo, ${user.name}.`,
        });
        navigate(returnTo);
      } else {
        toast({
          title: "Error de autenticación",
          description: "El correo electrónico o la contraseña son incorrectos.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-card p-8 animate-scale-in">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center text-sm font-medium text-gastro-brown hover:text-gastro-orange transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Volver
          </button>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gastro-brown mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-gray-600">
              Accede a tu cuenta para votar y participar
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gastro-orange focus:border-transparent transition-colors"
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gastro-orange focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gastro-orange focus:ring-gastro-orange border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>
              
              <a href="#" className="text-sm font-medium text-gastro-orange hover:text-gastro-brown">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            
            <button
              type="submit"
              className={`w-full flex items-center justify-center px-4 py-3 ${
                isLoading ? 'bg-gastro-orange/70' : 'bg-gastro-orange hover:bg-gastro-brown'
              } text-white font-medium rounded-md transition-colors`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-medium text-gastro-orange hover:text-gastro-brown">
                Regístrate
              </Link>
            </p>
            
            <div className="mt-4 px-6 py-2 bg-gastro-orange/10 rounded-md">
              <p className="text-xs text-gastro-brown">
                <strong>Nota:</strong> Para esta demo, usa:<br />
                Email: user@example.com<br />
                Contraseña: password
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
