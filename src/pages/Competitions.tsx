
import React, { useState, useEffect } from 'react';
import { CalendarRange, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { competitions } from '../lib/data';
import { Competition } from '../lib/types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CompetitionCard from '../components/CompetitionCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Competitions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompetitions, setFilteredCompetitions] = useState<Competition[]>(competitions);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let result = competitions;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(comp => 
        comp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        comp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply active/inactive filter
    if (activeFilter === 'active') {
      result = result.filter(comp => comp.isActive);
    } else if (activeFilter === 'past') {
      result = result.filter(comp => !comp.isActive);
    }
    
    setFilteredCompetitions(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, activeFilter]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompetitions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompetitions.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gastro-brown mb-2">
              Concursos Gastronómicos
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Explora todos los concursos gastronómicos y descubre los restaurantes participantes. 
              Vota por tus favoritos y ayúdalos a alcanzar la cima del ranking.
            </p>
          </div>
          
          {/* Filters section */}
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar concursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gastro-orange" />
                <span className="text-sm font-medium">Filtrar por:</span>
                <Tabs defaultValue="all" className="w-[300px]"
                  onValueChange={(value) => setActiveFilter(value)}>
                  <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="active">Activos</TabsTrigger>
                    <TabsTrigger value="past">Pasados</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Results section */}
          {filteredCompetitions.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentItems.map((competition) => (
                  <CompetitionCard 
                    key={competition.id} 
                    competition={competition} 
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => paginate(index + 1)}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-4 bg-gastro-peach/30 rounded-full mb-4">
                <CalendarRange className="h-6 w-6 text-gastro-orange" />
              </div>
              <h3 className="text-lg font-semibold text-gastro-brown mb-2">No se encontraron concursos</h3>
              <p className="text-gray-600 mb-4">
                No hay concursos que coincidan con tu búsqueda. Intenta con otros criterios.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                className="text-gastro-orange hover:text-gastro-brown font-medium transition-colors"
              >
                Ver todos los concursos
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Competitions;
