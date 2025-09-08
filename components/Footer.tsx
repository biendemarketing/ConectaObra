
import React from 'react';
import { HardHat, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <HardHat className="w-8 h-8 text-secondary" />
              <span className="text-2xl font-bold">ConectaObra</span>
            </div>
            <p className="text-gray-400">Tu centro de conexiones para la construcción.</p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Para Clientes</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Cómo contratar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Buscar servicios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pagos seguros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Soporte</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Para Proveedores</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Cómo registrarse</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crear un anuncio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Precios y comisiones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Prensa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos de servicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} ConectaObra. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
