
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center animate-scale-in">
          <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gastro-peach/30 text-gastro-orange mx-auto">
            <span className="text-4xl font-bold">404</span>
          </div>
          
          <h1 className="text-2xl font-bold text-gastro-brown mb-2">
            Página no encontrada
          </h1>
          
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gastro-orange text-white rounded hover:bg-gastro-brown transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Volver al inicio
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
