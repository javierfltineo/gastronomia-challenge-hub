
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Vote, Award, Utensils } from 'lucide-react';
import { competitions } from '../lib/data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CompetitionCard from '../components/CompetitionCard';

const Index: React.FC = () => {
  const [activeCompetitions, setActiveCompetitions] = useState(competitions.filter(comp => comp.isActive));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <header className="pt-28 pb-16 px-8 bg-gradient-to-b from-gastro-cream to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className={`lg:w-1/2 lg:pr-10 mb-10 lg:mb-0 text-center lg:text-left transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <span className="inline-block px-3 py-1 bg-gastro-orange/10 text-gastro-orange text-sm font-medium rounded-full mb-4">
                Descubre y Vota
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gastro-brown leading-tight">
                Descubre los Concursos Gastronómicos más Populares
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Explora y vota por tus restaurantes favoritos en los concursos culinarios más prestigiosos.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  to="/competitions"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gastro-orange text-white rounded-lg hover:bg-gastro-brown transition-colors shadow-sm"
                >
                  Ver Concursos
                  <ChevronRight size={18} className="ml-2" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gastro-brown border border-gastro-brown/30 rounded-lg hover:bg-gastro-orange-soft transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
            
            <div className={`lg:w-1/2 transition-opacity duration-500 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000"
                    alt="Plato gastronómico gourmet"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-white rounded-xl shadow-card p-4 flex flex-col items-center justify-center animate-float">
                  <Vote className="text-gastro-orange mb-2" size={28} />
                  <span className="text-sm font-medium text-gastro-brown text-center">Vota por tu favorito</span>
                </div>
                
                <div className="absolute -top-5 -right-5 w-32 h-32 bg-white rounded-xl shadow-card p-4 flex flex-col items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Award className="text-gastro-orange mb-2" size={28} />
                  <span className="text-sm font-medium text-gastro-brown text-center">Prestigiosos concursos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-gastro-peach text-gastro-brown text-sm font-medium rounded-full mb-4">
              ¿Cómo Funciona?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gastro-brown mb-4">
              Gastronomía en Competencia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestra plataforma conecta a los amantes de la gastronomía con los concursos culinarios más relevantes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-card hover:shadow-elevated transition-shadow duration-300">
              <div className="w-14 h-14 rounded-lg bg-gastro-peach flex items-center justify-center mb-6">
                <Utensils className="text-gastro-brown" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gastro-brown">Descubre Concursos</h3>
              <p className="text-gray-600">
                Explora una amplia variedad de concursos gastronómicos activos en diferentes categorías culinarias.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-card hover:shadow-elevated transition-shadow duration-300">
              <div className="w-14 h-14 rounded-lg bg-gastro-peach flex items-center justify-center mb-6">
                <Vote className="text-gastro-brown" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gastro-brown">Vota por tus Favoritos</h3>
              <p className="text-gray-600">
                Registra tu voto por los restaurantes que más te gusten y observa el ranking en tiempo real.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-card hover:shadow-elevated transition-shadow duration-300">
              <div className="w-14 h-14 rounded-lg bg-gastro-peach flex items-center justify-center mb-6">
                <Award className="text-gastro-brown" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gastro-brown">Celebra a los Ganadores</h3>
              <p className="text-gray-600">
                Descubre qué restaurantes han ganado los concursos anteriores y qué los hace especiales.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Active Competitions Section */}
      <section className="py-16 px-8 bg-gastro-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <span className="inline-block px-3 py-1 bg-gastro-orange/20 text-gastro-orange text-sm font-medium rounded-full mb-4">
                En Curso
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gastro-brown">
                Concursos Activos
              </h2>
            </div>
            <Link
              to="/competitions"
              className="mt-4 md:mt-0 inline-flex items-center text-gastro-brown hover:text-gastro-orange transition-colors"
            >
              Ver todos los concursos
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeCompetitions.map((competition, index) => (
              <CompetitionCard 
                key={competition.id} 
                competition={competition} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-gastro-brown to-gastro-brown-light rounded-2xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para participar?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Regístrate ahora y comienza a votar por tus restaurantes favoritos en los concursos gastronómicos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gastro-brown rounded-lg hover:bg-gastro-orange-soft transition-colors shadow-sm"
              >
                Registrarse
              </Link>
              <Link
                to="/competitions"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white border border-white/50 rounded-lg hover:bg-white/10 transition-colors"
              >
                Explorar Concursos
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
