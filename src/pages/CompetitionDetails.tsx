
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, BarChart2, List } from 'lucide-react';
import { competitions, restaurants } from '../lib/data';
import { Competition, Restaurant } from '../lib/types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RestaurantRanking from '../components/RestaurantRanking';
import RankingChart from '../components/RankingChart';

const CompetitionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [competitionRestaurants, setCompetitionRestaurants] = useState<Restaurant[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the competition
    const foundCompetition = competitions.find(comp => comp.id === id);
    
    if (foundCompetition) {
      setCompetition(foundCompetition);
      
      // Find restaurants for this competition
      const foundRestaurants = restaurants.filter(
        restaurant => restaurant.competitionId === id
      );
      
      setCompetitionRestaurants(foundRestaurants);
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const handleVote = () => {
    // Refresh the restaurant data after a vote
    const updatedRestaurants = restaurants.filter(
      restaurant => restaurant.competitionId === id
    );
    setCompetitionRestaurants([...updatedRestaurants]);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse-subtle">
            <div className="w-24 h-24 border-4 border-gastro-orange border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!competition) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold text-gastro-brown mb-4">
            Concurso no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            El concurso que estás buscando no existe o ha sido eliminado.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-gastro-orange text-white rounded"
          >
            <ChevronLeft size={18} className="mr-1" />
            Volver al inicio
          </button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Competition Header */}
      <header 
        className="pt-28 pb-12 px-8 bg-gradient-to-b from-gastro-cream to-white"
      >
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-6 inline-flex items-center text-sm font-medium text-gastro-brown hover:text-gastro-orange transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Volver a concursos
          </button>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Competition Image */}
            <div className="w-full lg:w-1/3 rounded-xl overflow-hidden shadow-elevated">
              <div className="aspect-[4/3]">
                <img
                  src={competition.image}
                  alt={competition.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Competition Info */}
            <div className="w-full lg:w-2/3 animate-fade-in">
              <div className="mb-4 flex items-center">
                {competition.isActive ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Activo
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                    Finalizado
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gastro-brown mb-4">
                {competition.name}
              </h1>
              
              <p className="text-gray-600 mb-6 text-lg">
                {competition.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex items-center">
                  <Calendar size={18} className="text-gastro-orange mr-2" />
                  <span className="text-sm text-gray-600">
                    <span className="font-medium">Inicio:</span> {formatDate(competition.startDate)}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={18} className="text-gastro-orange mr-2" />
                  <span className="text-sm text-gray-600">
                    <span className="font-medium">Fin:</span> {formatDate(competition.endDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Ranking Section */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-gastro-peach text-gastro-brown text-sm font-medium rounded-full mb-4">
                Ranking Actual
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-gastro-brown">
                Restaurantes Participantes
              </h2>
            </div>
            
            <div className="mt-4 md:mt-0 bg-white shadow-sm rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  viewMode === 'list' 
                    ? 'bg-gastro-peach text-gastro-brown' 
                    : 'bg-transparent text-gray-500 hover:text-gastro-brown'
                } transition-colors`}
              >
                <List size={18} className="mr-2" />
                Lista
              </button>
              
              <button
                onClick={() => setViewMode('chart')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  viewMode === 'chart' 
                    ? 'bg-gastro-peach text-gastro-brown' 
                    : 'bg-transparent text-gray-500 hover:text-gastro-brown'
                } transition-colors`}
              >
                <BarChart2 size={18} className="mr-2" />
                Gráfico
              </button>
            </div>
          </div>
          
          {competitionRestaurants.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-xl font-semibold text-gastro-brown mb-2">
                No hay restaurantes participantes
              </h3>
              <p className="text-gray-600">
                Este concurso aún no tiene restaurantes participantes.
              </p>
            </div>
          ) : viewMode === 'list' ? (
            <RestaurantRanking 
              restaurants={competitionRestaurants}
              competitionId={competition.id}
              onVote={handleVote}
            />
          ) : (
            <RankingChart restaurants={competitionRestaurants} />
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CompetitionDetails;
