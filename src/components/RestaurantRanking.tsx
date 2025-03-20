
import React, { useState, useEffect } from 'react';
import { Restaurant } from '../lib/types';
import VoteButton from './VoteButton';
import { Trophy, Award, Medal } from 'lucide-react';

interface RestaurantRankingProps {
  restaurants: Restaurant[];
  competitionId: string;
  onVote?: () => void;
}

const RestaurantRanking: React.FC<RestaurantRankingProps> = ({ 
  restaurants, 
  competitionId,
  onVote 
}) => {
  const [sortedRestaurants, setSortedRestaurants] = useState<Restaurant[]>([]);
  
  useEffect(() => {
    // Sort restaurants by votes (descending)
    const sorted = [...restaurants].sort((a, b) => b.votes - a.votes);
    setSortedRestaurants(sorted);
  }, [restaurants]);

  const getPositionIcon = (position: number) => {
    switch(position) {
      case 1:
        return <Trophy size={24} className="text-yellow-500" />;
      case 2:
        return <Medal size={24} className="text-gray-400" />;
      case 3:
        return <Award size={24} className="text-amber-700" />;
      default:
        return <span className="text-lg font-semibold text-gray-500">{position}</span>;
    }
  };

  const getPositionClass = (position: number) => {
    switch(position) {
      case 1:
        return 'border-l-yellow-500';
      case 2:
        return 'border-l-gray-400';
      case 3:
        return 'border-l-amber-700';
      default:
        return 'border-l-transparent';
    }
  };

  return (
    <div className="w-full">
      <div className="grid gap-4">
        {sortedRestaurants.map((restaurant, index) => (
          <div 
            key={restaurant.id}
            className={`bg-white rounded-lg shadow-sm border-l-4 ${getPositionClass(index + 1)} p-4 flex flex-col md:flex-row items-center md:items-start gap-4 animate-fade-in`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Rank */}
            <div className="flex-none w-12 h-12 rounded-full bg-gastro-peach/50 flex items-center justify-center">
              {getPositionIcon(index + 1)}
            </div>
            
            {/* Restaurant Image */}
            <div className="flex-none w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex-grow flex flex-col md:flex-row items-center md:items-start md:justify-between w-full">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h3 className="font-semibold text-gastro-brown text-lg mb-1">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {restaurant.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-gastro-peach/30 rounded-full">
                  <span className="text-gastro-brown text-sm font-medium">{restaurant.votes} votos</span>
                </div>
              </div>
              
              {/* Vote Button */}
              <div className="flex-none">
                <VoteButton
                  restaurantId={restaurant.id}
                  competitionId={competitionId}
                  onVote={onVote}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantRanking;
