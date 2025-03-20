
export interface Competition {
  id: string;
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  restaurants: Restaurant[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  votes: number;
  competitionId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  votes: string[]; // IDs of competitions the user has voted in
}
