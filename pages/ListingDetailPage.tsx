import React, { useState } from 'react';
import { Listing, Provider, ServicePackage } from '../types';
import StarRating from '../components/StarRating';
import { MapPin, MessageSquare, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface ListingDetailPageProps {
  listing: Listing;
  onInitiateBooking: (listing: Listing, pkg: ServicePackage) => void;
  onViewProviderProfile: (provider: Provider) => void;
  onSendMessage: (provider: Provider, initialMessage: string) => void;
}

const PackagesWidget: React.FC<{ listing: Listing, onInitiateBooking: (pkg: ServicePackage) => void }> = ({ listing, onInitiateBooking }) => {
  const [selectedTier, setSelectedTier] = useState<ServicePackage['tier']>(
    listing.packages.find(p => p.tier === 'Estándar') ? 'Estándar' : listing.packages[0]?.tier || 'Básico'
  );
  const selectedPackage = listing.packages.find(p => p.tier === selectedTier) || listing.packages[0];

  if (!selectedPackage) {
    return (
      <div className="sticky top-24 bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center">
        <p className="text-neutral-light">No hay paquetes de servicio disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="sticky top-24 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex border-b">
        {listing.packages.map(pkg => (
          <button
            key={pkg.tier}
            onClick={() => setSelectedTier(pkg.tier)}
            className={`flex-1 p-4 font-semibold transition-colors text-sm md:text-base ${
              selectedTier === pkg.tier ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-neutral-light hover:bg-gray-50'
            }`}
          >
            {pkg.tier}
          </button>
        ))}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-baseline mb-4">
          <p className="text-2xl font-bold text-neutral">${selectedPackage.price.toLocaleString()}</p>
          <p className="text-neutral-light font-semibold">{listing.type}</p>
        </div>
        <ul className="space-y-3 mb-6">
          {selectedPackage.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-neutral-light text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <button 
          onClick={() => onInitiateBooking(selectedPackage)}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-accent transition-colors mb-2"
        >
          Continuar (${selectedPackage.price.toLocaleString()})
        </button>
        <p className="text-center text-xs text-neutral-lighter mt-4">No se te cobrará nada todavía</p>
      </div>
    </div>
  );
};


const ImageGallery: React.FC<{ images: string[], title: string }> = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
        <div className="relative h-96 w-full rounded-xl overflow-hidden group">
            <div style={{ backgroundImage: `url(${images[currentIndex]})`}} className="w-full h-full bg-center bg-cover duration-500"></div>
            {images.length > 1 && <>
              {/* Left Arrow */}
              <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                  <ChevronLeft onClick={prevSlide} size={30} />
              </div>
               {/* Right Arrow */}
              <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                  <ChevronRight onClick={nextSlide} size={30} />
              </div>
            </>}
        </div>
    );
}

const ListingDetailPage: React.FC<ListingDetailPageProps> = ({ listing, onInitiateBooking, onViewProviderProfile, onSendMessage }) => {
  
  const handleSendMessageClick = () => {
    const message = `Hola, estoy interesado/a en tu servicio "${listing.title}".`;
    onSendMessage(listing.provider, message);
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-neutral mb-2">{listing.title}</h1>
          <div className="flex items-center space-x-4 text-neutral-light">
            <div className="flex items-center"><StarRating rating={listing.rating} /><span className="ml-2">({listing.reviewsCount} reseñas)</span></div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center"><MapPin className="w-4 h-4 mr-1"/>{listing.city}, {listing.province}</div>
          </div>
        </div>

        {/* Gallery */}
        <ImageGallery images={listing.gallery.length > 0 ? listing.gallery : [listing.imageUrl]} title={listing.title} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2">
            {/* Provider Info */}
            <div className="flex justify-between items-start pb-6 border-b">
              <div
                className="cursor-pointer group"
                onClick={() => onViewProviderProfile(listing.provider)}
              >
                <h2 className="text-2xl font-semibold text-neutral group-hover:text-primary transition-colors">{listing.type} ofrecido por {listing.provider.name}</h2>
                <p className="text-neutral-light">Miembro desde {listing.provider.memberSince}</p>
              </div>
              <img 
                src={listing.provider.avatarUrl} 
                alt={listing.provider.name} 
                className="w-16 h-16 rounded-full cursor-pointer"
                onClick={() => onViewProviderProfile(listing.provider)}
              />
            </div>
            {listing.provider.verified && (
                <div className="py-6 border-b flex items-center space-x-3">
                    <ShieldCheck className="w-8 h-8 text-green-600"/>
                    <div>
                        <h3 className="font-semibold text-neutral">Proveedor Verificado</h3>
                        <p className="text-neutral-light text-sm">Este proveedor ha completado nuestro proceso de verificación de identidad y credenciales.</p>
                    </div>
                </div>
            )}

            {/* Description */}
            <div className="py-6 border-b">
               <h3 className="text-xl font-semibold text-neutral mb-4">Sobre este servicio</h3>
              <p className="text-neutral-light whitespace-pre-wrap">{listing.description}</p>
            </div>
            
            {/* Specs */}
            {listing.specs && (
              <div className="py-6 border-b">
                <h3 className="text-xl font-semibold text-neutral mb-4">Especificaciones</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(listing.specs).map(([key, value]) => (
                    <div key={key} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-neutral-light">{key}: </span>
                        <span className="text-neutral">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
             <div className="py-6 border-b">
                <button onClick={handleSendMessageClick} className="bg-gray-100 text-neutral font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contactar al Proveedor
                </button>
             </div>

            {/* Reviews */}
            <div className="py-6">
              <h3 className="text-xl font-semibold text-neutral mb-6 flex items-center">
                <StarRating rating={listing.rating} />
                <span className="ml-4">· {listing.reviewsCount} reseñas</span>
              </h3>
              <div className="space-y-6">
                {listing.reviews.map(review => (
                  <div key={review.id}>
                    <div className="flex items-center mb-2">
                      <img src={review.authorAvatarUrl} alt={review.author} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold text-neutral">{review.author}</p>
                        <p className="text-sm text-neutral-lighter">{review.date}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="mt-2 text-neutral-light">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
          <div className="lg:col-span-1">
            <PackagesWidget listing={listing} onInitiateBooking={(pkg) => onInitiateBooking(listing, pkg)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;