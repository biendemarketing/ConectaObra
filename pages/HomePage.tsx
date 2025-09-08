import React, { useState, useMemo, useRef } from 'react';
import { Listing, Page, Provider } from '../types';
import ListingCard from '../components/ListingCard';
import { Search, HardHat, UserCheck, CheckCircle, Truck, Wrench, DraftingCompass, CircuitBoard, Building, Star, ShieldCheck, ArrowRight, ShowerHead, Scaling, PaintRoller, ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react';
import StarRating from '../components/StarRating';
import { provincesAndCities } from '../data/mockData';

interface HomePageProps {
  listings: Listing[];
  onSearch: (query: string) => void;
  onViewDetails: (listing: Listing) => void;
  onNavigate: (page: Page) => void;
  onViewProviderProfile: (provider: Provider) => void;
}

const CategoryCard: React.FC<{ icon: React.ElementType, name: string, onClick: () => void }> = ({ icon: Icon, name, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    
    return (
        <div 
            ref={cardRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            className="relative bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden"
        >
            <div 
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(0, 82, 204, 0.15), transparent)`
                }}
            />
            <div className="relative z-10">
                <Icon className="w-7 h-7 text-neutral-light group-hover:text-primary transition-colors" />
                <h3 className="font-semibold text-neutral mt-3 text-sm">{name}</h3>
            </div>
        </div>
    );
};

const RecentListingCarouselCard: React.FC<{ listing: Listing, onViewDetails: (listing: Listing) => void }> = ({ listing, onViewDetails }) => {
  return (
    <div 
      onClick={() => onViewDetails(listing)}
      className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 cursor-pointer group transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="bg-primary text-white p-4 font-bold h-24 flex items-center">
        <h3 className="text-lg leading-tight">{listing.title}</h3>
      </div>
      <div className="h-48">
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
    </div>
  )
}

const SpotlightProviderCard: React.FC<{ provider: Provider, onViewProviderProfile: (provider: Provider) => void }> = ({ provider, onViewProviderProfile }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onClick={() => onViewProviderProfile(provider)}
      onMouseMove={handleMouseMove}
      className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200/80 cursor-pointer group flex flex-col items-center p-6 text-center hover:-translate-y-1 transition-transform duration-300"
    >
      <div 
        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
            background: `radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), rgba(0, 82, 204, 0.1), transparent)`
        }}
      />
      <div className="relative z-10 flex flex-col items-center h-full w-full">
        <img src={provider.avatarUrl} alt={provider.name} className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-md" />
        <h3 className="font-bold text-lg text-neutral group-hover:text-primary transition-colors">{provider.name}</h3>
        <p className="text-sm text-neutral-light mt-1 mb-4 h-10 overflow-hidden flex-grow">{provider.bio.substring(0, 60)}...</p>
        <div className="flex items-center space-x-4 text-sm w-full justify-center pt-4 border-t mt-auto">
          <div className="flex items-center">
              <Star className="w-4 h-4 text-secondary fill-current mr-1" />
              <span className="font-bold text-neutral">{provider.rating.toFixed(1)}</span>
          </div>
          <div className="border-l h-4"></div>
          <div className="flex items-center">
              <ClipboardCheck className="w-4 h-4 text-neutral-light mr-1"/>
              <span className="font-bold text-neutral">{provider.projectsCompleted}</span>
              <span className="text-neutral-light ml-1">Completados</span>
          </div>
        </div>
      </div>
    </div>
  );
};


const HomePage: React.FC<HomePageProps> = ({ listings, onSearch, onViewDetails, onNavigate, onViewProviderProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleSuggestedSearch = (query: string) => {
    onSearch(query);
  }
  
  const spotlightProviders = useMemo(() => {
    const providersMap = new Map<string, Provider>();
    listings.forEach(l => {
        if (l.provider.spotlight && !providersMap.has(l.provider.id)) {
            providersMap.set(l.provider.id, l.provider);
        }
    });
    return Array.from(providersMap.values());
  }, [listings]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = [
      { name: 'Maquinaria Pesada', icon: Truck, type: 'Equipo' },
      { name: 'Herramientas', icon: Wrench, type: 'Equipo' },
      { name: 'Arquitectura', icon: DraftingCompass, type: 'Profesional' },
      { name: 'Ingeniería', icon: Building, type: 'Profesional' },
      { name: 'Electricidad', icon: CircuitBoard, type: 'Profesional' },
      { name: 'Plomería', icon: ShowerHead, type: 'Profesional' },
      { name: 'Topografía', icon: Scaling, type: 'Profesional' },
      { name: 'Pintura', icon: PaintRoller, type: 'Profesional' },
  ];
  
  const suggestedSearches = [
      'Diseño Arquitectónico',
      'Alquiler de Excavadora',
      'Ingeniería Estructural',
      'Planos y Permisos'
  ]

  return (
    <div>
      {/* New Hero Section */}
      <section className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Using a static image to simulate a video background */}
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" alt="Construction background" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-start text-left max-w-4xl">
           <h1 className="text-4xl md:text-6xl font-sans font-light mb-6" style={{lineHeight: 1.2}}>
              Nuestros profesionales<br/>
              <span className="font-semibold">se encargan desde aquí.</span>
           </h1>
          <form onSubmit={handleSearchSubmit} className="w-full bg-white rounded-full flex items-center p-1.5 shadow-lg mb-4">
              <input 
                type="text" 
                placeholder="Busca cualquier servicio..."
                className="w-full bg-transparent focus:outline-none text-neutral pl-5 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            <button type="submit" className="bg-neutral text-white rounded-full p-3 hover:bg-neutral/80 transition-colors">
                <Search className="w-6 h-6"/>
            </button>
          </form>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-semibold text-sm mr-2 hidden md:inline">Sugerencias:</span>
            {suggestedSearches.map(term => (
                <button 
                  key={term} 
                  onClick={() => handleSuggestedSearch(term)}
                  className="flex items-center text-xs md:text-sm font-light border border-white/80 rounded-full px-4 py-1.5 hover:bg-white hover:text-black transition-colors"
                >
                  {term}
                  <ArrowRight className="w-3 h-3 ml-2"/>
                </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By & Categories Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-gray-400 font-semibold">
                <span>Con la confianza de:</span>
                <span className="text-gray-500 font-bold text-lg">CEMEX</span>
                <span className="text-gray-500 font-bold text-lg">ACERO ESTRELLA</span>
                <span className="text-gray-500 font-bold text-lg">GRUPO VMO</span>
                <span className="text-gray-500 font-bold text-lg">AMAD</span>
                <span className="text-gray-500 font-bold text-lg">ARGOS</span>
            </div>
            <div className="mt-16">
                 <h2 className="text-3xl font-bold text-neutral text-center mb-12">Todo lo que tu obra necesita</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                    {categories.map(cat => (
                        <CategoryCard key={cat.name} icon={cat.icon} name={cat.name} onClick={() => { onSearch(cat.name) }} />
                    ))}
                 </div>
            </div>
        </div>
      </section>

      {/* Recent Posts Carousel Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-neutral">Publicaciones Recientes</h2>
            <div className="flex space-x-2">
              <button onClick={() => scroll('left')} className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors border">
                <ChevronLeft className="w-6 h-6 text-neutral" />
              </button>
              <button onClick={() => scroll('right')} className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors border">
                <ChevronRight className="w-6 h-6 text-neutral" />
              </button>
            </div>
          </div>
          <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {listings.slice(8, 18).map(listing => (
              <RecentListingCarouselCard key={listing.id} listing={listing} onViewDetails={onViewDetails} />
            ))}
          </div>
        </div>
      </section>
      
      {/* NEW: Spotlight Professionals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-neutral text-center mb-4">Profesionales Destacados</h2>
            <p className="text-center text-neutral-light mb-10 max-w-2xl mx-auto">Encuentra a los proveedores mejor valorados y con experiencia comprobada para asegurar el éxito de tu proyecto.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {spotlightProviders.map(provider => (
                    <SpotlightProviderCard key={provider.id} provider={provider} onViewProviderProfile={onViewProviderProfile} />
                ))}
            </div>
        </div>
      </section>


      {/* Popular Listings Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-neutral text-center mb-4">Servicios y Equipos Populares</h2>
          <p className="text-center text-neutral-light mb-10">Explora una selección de los anuncios mejor valorados por nuestra comunidad.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {listings.slice(0, 8).map(listing => (
              <ListingCard key={listing.id} listing={listing} onViewDetails={onViewDetails} onViewProviderProfile={onViewProviderProfile} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Ad Banner Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="relative bg-neutral rounded-2xl p-12 text-white overflow-hidden flex items-center">
            <div className="relative z-10 md:w-2/3">
              <h2 className="text-4xl font-bold mb-4">Seguridad y Eficiencia en Cada Contratación</h2>
              <p className="text-white/80 mb-8">Con nuestro sistema de pagos seguros y perfiles verificados, puedes contratar con la tranquilidad de que tu proyecto está en buenas manos.</p>
              <button className="bg-secondary text-neutral font-bold rounded-full px-8 py-3 text-base hover:brightness-110 transition-all">
                  Aprende más sobre nuestra seguridad
              </button>
            </div>
            <HardHat size={256} className="absolute -right-16 -bottom-16 text-white/10" />
        </div>
      </section>

      {/* Client CTA Section */}
       <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-neutral mb-4">¿Listo para empezar tu próximo proyecto?</h2>
          <p className="text-neutral-light max-w-2xl mx-auto mb-8">Publica tu necesidad o explora miles de servicios para encontrar la solución perfecta para tu obra. Es rápido, fácil y seguro.</p>
          <button 
              onClick={() => onSearch('')}
              className="bg-primary text-white font-bold rounded-full px-10 py-4 text-lg hover:bg-accent transition-all"
            >
                Explorar todos los servicios
          </button>
        </div>
      </section>

      {/* Provider CTA Section */}
      <section className="py-20 bg-primary/90 text-white">
          <div className="container mx-auto px-4 text-center">
              <HardHat size={48} className="mx-auto mb-4 text-secondary"/>
              <h2 className="text-3xl font-bold mb-4">¿Eres un proveedor o profesional?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg text-white/90">Únete a ConectaObra y lleva tu negocio al siguiente nivel. Alcanza a miles de clientes, gestiona tus reservas y haz crecer tu reputación online.</p>
              <button 
                onClick={() => onNavigate('register')}
                className="bg-secondary text-neutral font-bold rounded-full px-10 py-4 text-lg hover:brightness-110 transition-all"
              >
                  Ofrece un servicio ahora
              </button>
          </div>
      </section>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;  
            scrollbar-width: none;  
        }
      `}</style>
    </div>
  );
};

export default HomePage;