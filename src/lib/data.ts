
import { Competition, Restaurant, User } from './types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Usuario Demo',
    email: 'user@example.com',
    votes: ['comp1'],
  },
];

// Mock Competitions
export const competitions: Competition[] = [
  {
    id: 'comp1',
    name: 'Festival de Tapas 2023',
    description: 'Los mejores restaurantes compiten por crear la tapa más innovadora y deliciosa de la ciudad.',
    image: 'https://images.unsplash.com/photo-1607098665874-fd193397547b?q=80&w=1000',
    startDate: '2023-10-01',
    endDate: '2023-10-15',
    isActive: true,
    restaurants: []
  },
  {
    id: 'comp2',
    name: 'Concurso Paella Valenciana',
    description: 'Competición anual para encontrar el mejor chef de paella tradicional valenciana.',
    image: 'https://images.unsplash.com/photo-1604156788856-2ce5f2171cff?q=80&w=1000',
    startDate: '2023-11-05',
    endDate: '2023-11-12',
    isActive: true,
    restaurants: []
  },
  {
    id: 'comp3',
    name: 'Batalla de Chefs: Cocina Mediterránea',
    description: 'Enfrentamiento entre los mejores chefs especializados en cocina mediterránea.',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000',
    startDate: '2023-09-15',
    endDate: '2023-10-30',
    isActive: true,
    restaurants: []
  },
  {
    id: 'comp4',
    name: 'Premio al Mejor Postre 2023',
    description: 'Descubre las creaciones más dulces y sorprendentes de los mejores reposteros.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1000',
    startDate: '2023-12-01',
    endDate: '2023-12-15',
    isActive: false,
    restaurants: []
  },
];

// Mock Restaurants
export const restaurants: Restaurant[] = [
  {
    id: 'rest1',
    name: 'El Rincón de la Abuela',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1000',
    description: 'Cocina tradicional con un toque moderno.',
    votes: 42,
    competitionId: 'comp1',
  },
  {
    id: 'rest2',
    name: 'Mar y Montaña',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000',
    description: 'Lo mejor del mar y la montaña en un solo lugar.',
    votes: 38,
    competitionId: 'comp1',
  },
  {
    id: 'rest3',
    name: 'Sabores del Mundo',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000',
    description: 'Fusión de sabores internacionales con ingredientes locales.',
    votes: 51,
    competitionId: 'comp1',
  },
  {
    id: 'rest4',
    name: 'La Terraza Verde',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000',
    description: 'Cocina sostenible y ecológica en un entorno único.',
    votes: 29,
    competitionId: 'comp1',
  },
  {
    id: 'rest5',
    name: 'Fuego y Leña',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000',
    description: 'Especialidad en carnes a la brasa y horno de leña.',
    votes: 45,
    competitionId: 'comp1',
  },
  // Restaurants for competition 2
  {
    id: 'rest6',
    name: 'Arrocería Valencia',
    image: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?q=80&w=1000',
    description: 'Especialistas en arroces tradicionales valencianos.',
    votes: 56,
    competitionId: 'comp2',
  },
  {
    id: 'rest7',
    name: 'La Albufera',
    image: 'https://images.unsplash.com/photo-1534422646206-1d5a7cfa3c8a?q=80&w=1000',
    description: 'Paellas con ingredientes frescos de la Albufera.',
    votes: 48,
    competitionId: 'comp2',
  },
  {
    id: 'rest8',
    name: 'El Palleter',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1000',
    description: 'Tradición de arroces desde 1980.',
    votes: 62,
    competitionId: 'comp2',
  },
  // Restaurants for competition 3
  {
    id: 'rest9',
    name: 'Mediterráneo Azul',
    image: 'https://images.unsplash.com/photo-1530632789071-8543f47edb34?q=80&w=1000',
    description: 'Lo mejor del mar Mediterráneo en tu plato.',
    votes: 37,
    competitionId: 'comp3',
  },
  {
    id: 'rest10',
    name: 'Olivo y Romero',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?q=80&w=1000',
    description: 'Cocina mediterránea de autor con productos de proximidad.',
    votes: 44,
    competitionId: 'comp3',
  },
  // Restaurants for competition 4 (Inactive)
  {
    id: 'rest11',
    name: 'Dulce Pasión',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1000',
    description: 'Pastelería creativa con sabores tradicionales reinventados.',
    votes: 28,
    competitionId: 'comp4',
  },
  {
    id: 'rest12',
    name: 'Tentación Chocolate',
    image: 'https://images.unsplash.com/photo-1561702771-ac6a78f25c43?q=80&w=1000',
    description: 'Especialistas en creaciones con chocolate de origen.',
    votes: 31,
    competitionId: 'comp4',
  },
];

// Initialize competitions with their restaurants
competitions.forEach(competition => {
  competition.restaurants = restaurants.filter(
    restaurant => restaurant.competitionId === competition.id
  );
});

// Mock authentication
let currentUser: User | null = null;

export const login = (email: string, password: string): User | null => {
  // Simple mock login - in a real app, this would authenticate against a database
  const user = users.find(u => u.email === email);
  if (user) {
    currentUser = user;
    return user;
  }
  return null;
};

export const logout = (): void => {
  currentUser = null;
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const hasVoted = (competitionId: string): boolean => {
  if (!currentUser) return false;
  return currentUser.votes.includes(competitionId);
};

export const vote = (restaurantId: string, competitionId: string): boolean => {
  if (!currentUser || hasVoted(competitionId)) return false;
  
  // Find restaurant and increment vote
  const restaurant = restaurants.find(r => r.id === restaurantId);
  if (restaurant) {
    restaurant.votes += 1;
    // Mark user as having voted in this competition
    currentUser.votes.push(competitionId);
    return true;
  }
  
  return false;
};
