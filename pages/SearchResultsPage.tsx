import React, { useState, useMemo } from 'react';
import { Listing, Provider } from '../types';
import ListingCard from '../components/ListingCard';
import { Map, List, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { provincesAndCities } from '../data/mockData';

interface SearchResultsPageProps {
  listings: Listing[];
  onViewDetails: (listing: Listing) => void;
  initialQuery: string;
  onSearch: (query: string) => void;
  onViewProviderProfile: (provider: Provider) => void;
}

interface Filters {
  category: 'Todas' | 'Equipo' | 'Profesional';
  priceRange: number;
  minRating: number;
  verifiedOnly: boolean;
  province: string;
  city: string;
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

const FilterSidebar: React.FC<{
  onApplyFilters: (filters: Omit<Filters, 'province' | 'city'> & { province: string; city: string }) => void;
  initialFilters: Filters;
}> = ({ onApplyFilters, initialFilters }) => {
  const [category, setCategory] = useState(initialFilters.category);
  const [price, setPrice] = useState(initialFilters.priceRange);
  const [rating, setRating] = useState(initialFilters.minRating);
  const [verified, setVerified] = useState(initialFilters.verifiedOnly);
  const [selectedProvince, setSelectedProvince] = useState(initialFilters.province);
  const [selectedCity, setSelectedCity] = useState(initialFilters.city);

  const availableCities = useMemo(() => {
    if (!selectedProvince) return [];
    return provincesAndCities.find(p => p.province === selectedProvince)?.cities || [];
  }, [selectedProvince]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedProvince(e.target.value);
      setSelectedCity(''); // Reset city when province changes
  }

  const handleRatingChange = (newRating: number) => {
    setRating(prev => (prev === newRating ? 0 : newRating));
  };

  const handleApply = () => {
    onApplyFilters({
      category,
      priceRange: price,
      minRating: rating,
      verifiedOnly: verified,
      province: selectedProvince,
      city: selectedCity
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-6 text-neutral flex items-center"><SlidersHorizontal className="w-5 h-5 mr-2" />Filtros</h3>
      
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">Categoría</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Filters['category'])}
          className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-primary focus:border-primary block"
        >
          <option value="Todas">Todas</option>
          <option value="Equipo">Alquiler de Equipos</option>
          <option value="Profesional">Contratar Profesionales</option>
        </select>
      </div>

       <div className="mb-6">
        <label htmlFor="province" className="block text-sm font-bold text-gray-700 mb-2">Provincia</label>
        <select id="province" value={selectedProvince} onChange={handleProvinceChange} className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-primary focus:border-primary block">
            <option value="">Todas</option>
            {provincesAndCities.map(p => <option key={p.province} value={p.province}>{p.province}</option>)}
        </select>
      </div>
       <div className="mb-6">
        <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">Ciudad</label>
        <select id="city" value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-primary focus:border-primary block" disabled={!selectedProvince}>
            <option value="">Todas</option>
            {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="price-range" className="block text-sm font-bold text-gray-700 mb-2">Precio Máximo</label>
        <input
          type="range"
          id="price-range"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          min="0"
          max="5000"
          step="100"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>$0</span>
          <span className="font-semibold text-primary">${price.toLocaleString()}</span>
          <span>$5000+</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="block text-sm font-bold text-gray-700 mb-3">Calificación</h4>
        <div className="space-y-3">
          {[5, 4, 3].map(star => (
            <div key={star} className="flex items-center">
              <input
                type="checkbox"
                id={`star-${star}`}
                checked={rating === star}
                onChange={() => handleRatingChange(star)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary bg-white"
              />
              <label htmlFor={`star-${star}`} className="ml-3 text-sm font-medium text-gray-900">{star} estrellas o más</label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t">
        <h4 className="block text-sm font-bold text-gray-700 mb-3">Verificación</h4>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="verified"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary bg-white"
          />
          <label htmlFor="verified" className="ml-3 text-sm font-medium text-gray-900">Solo proveedores verificados</label>
        </div>
      </div>

      <button
        onClick={handleApply}
        className="mt-8 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};


const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ listings, onViewDetails, initialQuery, onSearch, onViewProviderProfile }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  
  const [activeFilters, setActiveFilters] = useState<Filters>({
    category: 'Todas',
    priceRange: 5000,
    minRating: 0,
    verifiedOnly: false,
    province: '',
    city: '',
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveFilters({ category: 'Todas', priceRange: 5000, minRating: 0, verifiedOnly: false, province: '', city: '' });
    onSearch(searchQuery);
  };
  
  const displayedListings = useMemo(() => {
    let filtered = listings.filter(listing => {
      if (activeFilters.category !== 'Todas' && listing.category !== activeFilters.category) return false;
      
      const minPrice = Math.min(...listing.packages.map(p => p.price));
      if (activeFilters.priceRange < 5000 && minPrice > activeFilters.priceRange) return false;
      
      if (listing.rating < activeFilters.minRating) return false;

      if (activeFilters.verifiedOnly && !listing.provider.verified) return false;
      
      if (activeFilters.province && listing.province !== activeFilters.province) return false;
      
      if (activeFilters.city && listing.city !== activeFilters.city) return false;
      
      return true;
    });

    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => Math.min(...a.packages.map(p => p.price)) - Math.min(...b.packages.map(p => p.price)));
        break;
      case 'price-desc':
        filtered.sort((a, b) => Math.min(...b.packages.map(p => p.price)) - Math.min(...a.packages.map(p => p.price)));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'relevance'
        break;
    }
    return filtered;
  }, [listings, activeFilters, sortOption]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSearchSubmit} className="bg-white rounded-xl shadow-md p-2 mb-8 flex items-center gap-2 border border-gray-200">
            <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por servicio, equipo o proveedor..."
                    className="w-full bg-transparent rounded-md pl-12 pr-4 py-3 text-gray-900 focus:outline-none"
                />
            </div>
            <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors flex-shrink-0">
              Buscar
            </button>
        </form>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-24">
            <FilterSidebar initialFilters={activeFilters} onApplyFilters={setActiveFilters} />
          </aside>

          <main className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-neutral">{displayedListings.length} resultados encontrados</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <ArrowUpDown className="w-4 h-4 mr-2 text-gray-500"/>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="text-sm font-medium bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="relevance">Relevancia</option>
                    <option value="price-asc">Precio: más bajo primero</option>
                    <option value="price-desc">Precio: más alto primero</option>
                    <option value="rating">Mejor Calificación</option>
                  </select>
                </div>
                <div className="hidden sm:flex items-center space-x-1 p-1 bg-gray-200/70 rounded-lg">
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:bg-gray-300/50'}`}
                    aria-label="Vista de lista"
                  >
                    <List className="h-5 w-5"/>
                  </button>
                  <button 
                    onClick={() => setViewMode('map')} 
                    className={`p-2 rounded-md transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:bg-gray-300/50'}`}
                    aria-label="Vista de mapa"
                  >
                    <Map className="h-5 w-5"/>
                  </button>
                </div>
              </div>
            </div>
            
            {viewMode === 'list' ? (
              <>
              {displayedListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} onViewDetails={onViewDetails} onViewProviderProfile={onViewProviderProfile} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm border">
                   <h3 className="text-xl font-semibold text-neutral">No se encontraron resultados</h3>
                   <p className="text-neutral-light mt-2">Intenta ajustar tus filtros o tu búsqueda.</p>
                </div>
              )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm h-[600px] flex items-center justify-center border">
                <div className="text-center">
                  <Map size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500">Vista de mapa</h3>
                  <p className="text-gray-400">La funcionalidad de mapa estará disponible próximamente.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;