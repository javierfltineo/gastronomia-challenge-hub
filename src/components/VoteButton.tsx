
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, Check } from 'lucide-react';
import { vote, hasVoted, getCurrentUser } from '../lib/data';
import { toast } from '@/components/ui/use-toast';

interface VoteButtonProps {
  restaurantId: string;
  competitionId: string;
  onVote?: () => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ restaurantId, competitionId, onVote }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserVoted, setHasUserVoted] = useState(hasVoted(competitionId));
  const navigate = useNavigate();

  const handleVote = () => {
    const user = getCurrentUser();
    
    if (!user) {
      navigate('/login', { state: { returnTo: `/competition/${competitionId}` } });
      return;
    }
    
    if (hasUserVoted) {
      toast({
        title: "Ya has votado",
        description: "Solo puedes votar una vez por concurso.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const success = vote(restaurantId, competitionId);
      
      if (success) {
        setHasUserVoted(true);
        toast({
          title: "¡Voto registrado!",
          description: "Tu voto ha sido registrado correctamente.",
        });
        if (onVote) onVote();
      } else {
        toast({
          title: "Error al votar",
          description: "Ha ocurrido un error al registrar tu voto.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 500);
  };

  if (hasUserVoted) {
    return (
      <button
        disabled
        className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded font-medium text-sm"
      >
        <Check size={16} className="mr-2" />
        Votado
      </button>
    );
  }

  return (
    <button
      onClick={handleVote}
      disabled={isLoading}
      className={`inline-flex items-center px-4 py-2 ${
        isLoading
          ? 'bg-gastro-orange/70'
          : 'bg-gastro-orange hover:bg-gastro-brown'
      } text-white rounded font-medium text-sm transition-colors`}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <ThumbsUp size={16} className="mr-2" />
      )}
      Votar
    </button>
  );
};

export default VoteButton;
