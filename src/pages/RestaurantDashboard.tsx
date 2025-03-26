
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, ChevronsUp, ExternalLink, PlayCircle, Table, Utensils } from 'lucide-react';
import { competitions, restaurants, getCurrentUser } from '../lib/data';
import { Competition, Restaurant } from '../lib/types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const RestaurantDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeCompetitions, setActiveCompetitions] = useState<Competition[]>([]);
  const [participatingCompetitions, setParticipatingCompetitions] = useState<Competition[]>([]);
  const [availableCompetitions, setAvailableCompetitions] = useState<Competition[]>([]);
  const currentUser = getCurrentUser();

  // Mock restaurant ID for the current user 
  // In a real app, this would come from authentication
  const currentRestaurantId = "rest1";
  
  useEffect(() => {
    // Filter active competitions
    const active = competitions.filter(comp => comp.isActive);
    setActiveCompetitions(active);
    
    // Filter competitions where the restaurant is participating
    const participating = active.filter(comp => 
      comp.restaurants.some(rest => rest.id === currentRestaurantId)
    );
    setParticipatingCompetitions(participating);
    
    // Filter competitions where the restaurant is not yet participating
    const available = active.filter(comp => 
      !comp.restaurants.some(rest => rest.id === currentRestaurantId)
    );
    setAvailableCompetitions(available);
    
    // Check if user is logged in
    if (!currentUser) {
      toast({
        title: "Acceso restringido",
        description: "Necesitas iniciar sesión para ver el dashboard de restaurantes.",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Function to get the ranking position of the restaurant in a competition
  const getRestaurantRanking = (competitionId: string): number => {
    const competition = competitions.find(comp => comp.id === competitionId);
    if (!competition) return 0;
    
    const sortedRestaurants = [...competition.restaurants].sort((a, b) => b.votes - a.votes);
    const position = sortedRestaurants.findIndex(rest => rest.id === currentRestaurantId);
    return position !== -1 ? position + 1 : 0;
  };

  // Function to handle join competition request
  const handleJoinCompetition = (competitionId: string) => {
    toast({
      title: "Solicitud enviada",
      description: "Tu solicitud para participar en el concurso ha sido enviada. Te notificaremos cuando sea aprobada.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gastro-brown mb-2">
              Dashboard de Restaurante
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Administra tus participaciones en concursos gastronómicos, consulta tu ranking y únete a nuevos concursos.
            </p>
          </div>
          
          {/* Dashboard stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-gastro-orange" />
                  Concursos activos
                </CardTitle>
                <CardDescription>Total de concursos abiertos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gastro-brown">{activeCompetitions.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <PlayCircle className="h-5 w-5 mr-2 text-gastro-orange" />
                  Participaciones
                </CardTitle>
                <CardDescription>Concursos donde participas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gastro-brown">{participatingCompetitions.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Award className="h-5 w-5 mr-2 text-gastro-orange" />
                  Mejor posición
                </CardTitle>
                <CardDescription>Tu mejor posición en un ranking</CardDescription>
              </CardHeader>
              <CardContent>
                {participatingCompetitions.length > 0 ? (
                  <p className="text-3xl font-bold text-gastro-brown">
                    {Math.min(...participatingCompetitions.map(comp => getRestaurantRanking(comp.id)))}º
                  </p>
                ) : (
                  <p className="text-3xl font-bold text-gray-400">-</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs for different tables */}
          <Tabs defaultValue="participating" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="participating">Mis participaciones</TabsTrigger>
              <TabsTrigger value="available">Concursos disponibles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="participating">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-medium flex items-center">
                    <Table className="h-5 w-5 mr-2 text-gastro-orange" />
                    Concursos en los que participas
                  </CardTitle>
                  <CardDescription>
                    Consulta tu posición en el ranking de cada concurso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {participatingCompetitions.length > 0 ? (
                    <UITable>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Concurso</TableHead>
                          <TableHead>Fechas</TableHead>
                          <TableHead>Posición actual</TableHead>
                          <TableHead>Votos</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {participatingCompetitions.map((competition) => {
                          const ranking = getRestaurantRanking(competition.id);
                          const restaurant = competition.restaurants.find(
                            r => r.id === currentRestaurantId
                          );
                          
                          return (
                            <TableRow key={competition.id}>
                              <TableCell className="font-medium">{competition.name}</TableCell>
                              <TableCell>
                                {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <span className={`font-bold ${ranking <= 3 ? 'text-gastro-orange' : ''}`}>
                                    {ranking}º
                                  </span>
                                  {ranking <= 3 && (
                                    <ChevronsUp className="ml-1 h-4 w-4 text-green-500" />
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{restaurant?.votes || 0}</TableCell>
                              <TableCell>
                                <Link to={`/competition/${competition.id}`}>
                                  <Button variant="ghost" size="sm">
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Ver detalle
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </UITable>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No estás participando en ningún concurso actualmente
                      </p>
                      <p className="text-sm text-gray-400">
                        Explora los concursos disponibles y únete a ellos para aparecer aquí
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="available">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-medium flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-gastro-orange" />
                    Concursos disponibles
                  </CardTitle>
                  <CardDescription>
                    Concursos a los que puedes unirte como restaurante
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {availableCompetitions.length > 0 ? (
                    <UITable>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Concurso</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Fechas</TableHead>
                          <TableHead>Participantes</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {availableCompetitions.map((competition) => (
                          <TableRow key={competition.id}>
                            <TableCell className="font-medium">{competition.name}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {competition.description}
                            </TableCell>
                            <TableCell>
                              {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{competition.restaurants.length}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleJoinCompetition(competition.id)}
                                >
                                  Participar
                                </Button>
                                <Link to={`/competition/${competition.id}`}>
                                  <Button variant="outline" size="sm">
                                    Ver detalle
                                  </Button>
                                </Link>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </UITable>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No hay concursos disponibles en este momento
                      </p>
                      <p className="text-sm text-gray-400">
                        Vuelve a consultar más tarde para ver nuevos concursos
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantDashboard;
