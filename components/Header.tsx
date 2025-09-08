import React, { useState, useRef } from 'react';
import { HardHat, User, Menu, X, ChevronDown, LogOut, LayoutDashboard, Truck, Wrench, DraftingCompass, Building, CircuitBoard, Hammer, UserCheck, Eye } from 'lucide-react';
import { Page, User as UserType } from '../types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  user: UserType | null;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

const SpotlightLink: React.FC<{ children: React.ReactNode; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ children, onClick }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <a 
      href="#" 
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={onClick} 
      className="relative p-2 rounded-md group overflow-hidden text-neutral-light font-medium hover:text-primary transition-colors"
    >
        <div 
            className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{
                background: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), rgba(0, 82, 204, 0.15), transparent)`
            }}
        />
        <span className="relative z-10">{children}</span>
    </a>
  );
};

const megaMenuContent = {
  equipos: [
    { title: 'Maquinaria Pesada', icon: Truck, items: ['Excavadora', 'Retroexcavadora', 'Grúa', 'Camión de Volteo'] },
    { title: 'Herramientas y Equipos', icon: Wrench, items: ['Andamios', 'Compactadora', 'Generador', 'Martillo Demoledor'] }
  ],
  profesionales: [
    { title: 'Diseño y Planificación', icon: DraftingCompass, items: ['Arquitectura', 'Ingeniería Civil', 'Diseño de Interiores', 'Topografía'] },
    { title: 'Construcción y Oficios', icon: Hammer, items: ['Plomería', 'Electricidad', 'Pintura', 'Carpintería'] },
    { title: 'Supervisión y Gestión', icon: UserCheck, items: ['Supervisión de Obras', 'Gestión de Permisos'] }
  ]
};

const MegaMenu: React.FC<{ 
  title: string; 
  content: { title: string; icon: React.ElementType; items: string[] }[];
  onSearch: (query: string) => void;
}> = ({ title, content, onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="flex items-center p-2 rounded-md group text-neutral-light font-medium hover:text-primary transition-colors">
                <span>{title}</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-white rounded-lg shadow-2xl border p-6 z-50">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        {content.map(category => (
                            <div key={category.title}>
                                <h3 className="flex items-center font-bold text-neutral mb-3 text-base">
                                    <category.icon className="w-5 h-5 mr-2 text-primary" />
                                    {category.title}
                                </h3>
                                <ul className="space-y-2">
                                    {category.items.map(item => (
                                        <li key={item}>
                                            <a 
                                                href="#" 
                                                onClick={(e) => { e.preventDefault(); onSearch(item); }}
                                                className="text-neutral-light hover:text-primary transition-colors text-sm"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ onNavigate, user, onLogout, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleDashboardNavigation = () => {
    if (user) {
      onNavigate('dashboard');
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <HardHat className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-neutral">ConectaObra</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
            <MegaMenu title="Alquiler de Equipos" content={megaMenuContent.equipos} onSearch={onSearch} />
            <MegaMenu title="Contratar Profesionales" content={megaMenuContent.profesionales} onSearch={onSearch} />
            <SpotlightLink onClick={(e) => { e.preventDefault(); onNavigate('como-funciona');}}>Cómo Funciona</SpotlightLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2">
                  <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                  <span className="font-medium text-neutral">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button onClick={() => { handleDashboardNavigation(); setIsUserMenuOpen(false); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LayoutDashboard className="w-4 h-4 mr-2" /> Panel de Control
                    </button>
                    <button onClick={() => { onLogout(); setIsUserMenuOpen(false); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                       <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <SpotlightLink onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Ofrece un servicio</SpotlightLink>
                <button onClick={() => onNavigate('login')} className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-accent transition-colors">
                  <User className="w-5 h-5" />
                  <span>Ingresar</span>
                </button>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-20 left-0 w-full">
          <nav className="flex flex-col p-4 space-y-4">
             {user ? (
              <>
                <button onClick={() => { handleDashboardNavigation(); setIsMenuOpen(false); }} className="flex items-center space-x-2 text-neutral-light font-medium hover:text-primary transition-colors">
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Panel de Control</span>
                </button>
                <hr/>
                <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="flex items-center space-x-2 text-red-500 font-medium hover:text-red-700 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
               <>
                <a href="#" onClick={(e) => { e.preventDefault(); onSearch('Equipo'); setIsMenuOpen(false); }} className="text-neutral-light font-medium hover:text-primary transition-colors">Alquiler de Equipos</a>
                <a href="#" onClick={(e) => { e.preventDefault(); onSearch('Profesional'); setIsMenuOpen(false); }} className="text-neutral-light font-medium hover:text-primary transition-colors">Contratar Profesionales</a>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('como-funciona'); setIsMenuOpen(false);}} className="text-neutral-light font-medium hover:text-primary transition-colors">Cómo Funciona</a>
                <hr/>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); setIsMenuOpen(false);}} className="text-neutral-light font-medium hover:text-primary transition-colors">Ofrece un servicio</a>
                <button onClick={() => {onNavigate('login'); setIsMenuOpen(false);}} className="flex items-center space-x-2 bg-primary text-white w-full justify-center py-2 rounded-md font-semibold hover:bg-accent transition-colors">
                  <User className="w-5 h-5" />
                  <span>Ingresar</span>
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;