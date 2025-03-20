
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { Competition } from '../lib/types';

interface CompetitionCardProps {
  competition: Competition;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition }) => {
  const { id, name, description, image, startDate, endDate, isActive } = competition;
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const startFormatted = formatDate(startDate);
  const endFormatted = formatDate(endDate);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card group card-hover animate-scale-in">
      <div className="relative">
        {/* Status Badge */}
        {isActive ? (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            Activo
          </div>
        ) : (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gray-400 text-white text-xs font-medium rounded-full">
            Finalizado
          </div>
        )}
        
        {/* Image with overlay */}
        <div className="aspect-[4/3] w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-30 transition-opacity z-10"></div>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar size={14} className="text-gastro-orange" />
          <span className="text-xs text-gray-500">
            {startFormatted} - {endFormatted}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gastro-brown mb-2 font-poppins line-clamp-1">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <Link 
          to={`/competition/${id}`}
          className="inline-flex items-center px-4 py-2 bg-gastro-peach hover:bg-gastro-orange-soft text-gastro-brown text-sm font-medium rounded transition-colors"
        >
          Ver detalles
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default CompetitionCard;
