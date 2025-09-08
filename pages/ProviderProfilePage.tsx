import React, { useMemo } from 'react';
import { Provider, Listing } from '../types';
import StarRating from '../components/StarRating';
import ListingCard from '../components/ListingCard';
import { ShieldCheck, MapPin, CalendarDays, ClipboardCheck, Clock, Award } from 'lucide-react';

interface ProviderProfilePageProps {
  provider: Provider;
  allListings: Listing[];
  onViewDetails: (listing: Listing) => void;
  onViewProviderProfile: (provider: Provider) => void;
}

const ProviderProfilePage: React.FC<ProviderProfilePageProps> = ({ provider, allListings, onViewDetails, onViewProviderProfile }) => {
  const providerListings = useMemo(() => {
    return allListings.filter(listing => listing.provider.id === provider.id);
  }, [allListings, provider.id]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Sidebar */}
          <aside className="w-full md:w-1/3 lg:w-1/4 md:sticky md:top-24">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
              <img src={provider.avatarUrl} alt={provider.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary" />
              <h1 className="text-2xl font-bold text-neutral">{provider.name}</h1>
              {provider.verified && (
                <div className="flex items-center justify-center mt-2 text-green-600">
                  <ShieldCheck className="w-5 h-5 mr-1" />
                  <span className="font-semibold text-sm">Proveedor Verificado</span>
                </div>
              )}
              <div className="my-4">
                <StarRating rating={provider.rating} />
                <p className="text-sm text-neutral-light mt-1">({provider.reviewsCount} reseñas)</p>
              </div>
              <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-accent transition-colors">
                Contactar Proveedor
              </button>
            </div>
            <div className="bg-white p-6 mt-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="font-bold text-neutral mb-4">Información</h3>
              <ul className="space-y-3 text-sm text-neutral-light">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Ubicación: <span className="font-medium text-neutral">{provider.city}, {provider.province}</span></span>
                </li>
                <li className="flex items-start">
                  <CalendarDays className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Miembro desde <span className="font-medium text-neutral">{provider.memberSince}</span></span>
                </li>
                 <li className="flex items-start">
                  <ClipboardCheck className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span><span className="font-medium text-neutral">{provider.projectsCompleted}</span> proyectos completados</span>
                </li>
                 <li className="flex items-start">
                  <Clock className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Tiempo de resp.: <span className="font-medium text-neutral">{provider.responseTime}</span></span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-neutral mb-4">Sobre {provider.name}</h2>
              <p className="text-neutral-light whitespace-pre-wrap">{provider.bio}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold text-neutral mb-4">Habilidades</h2>
                <div className="flex flex-wrap gap-2">
                    {provider.skills.map(skill => (
                        <span key={skill} className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-full">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold text-neutral mb-4">Proyectos Destacados</h2>
                <ul className="space-y-4">
                    {provider.completedProjectSamples.map((project, index) => (
                        <li key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div className="bg-primary/10 p-3 rounded-lg mr-4">
                               <Award className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral">{project.name}</h3>
                                <p className="text-sm text-neutral-light">{project.category}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral mb-6">Anuncios de {provider.name} ({providerListings.length})</h2>
              {providerListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {providerListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} onViewDetails={onViewDetails} onViewProviderProfile={onViewProviderProfile}/>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-neutral">Este proveedor no tiene anuncios activos</h3>
                  <p className="text-neutral-light mt-2">Vuelve a consultar más tarde.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;