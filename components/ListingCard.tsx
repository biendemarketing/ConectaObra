import React, { useMemo } from 'react';
import { Listing, Provider } from '../types';
import { MapPin, ShieldCheck } from 'lucide-react';
import StarRating from './StarRating';

interface ListingCardProps {
  listing: Listing;
  onViewDetails: (listing: Listing) => void;
  onViewProviderProfile: (provider: Provider) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onViewDetails, onViewProviderProfile }) => {
  
  const handleProviderClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card's onClick from firing
    onViewProviderProfile(listing.provider);
  }

  const minPrice = useMemo(() => {
    if (!listing.packages || listing.packages.length === 0) return 0;
    return Math.min(...listing.packages.map(p => p.price));
  }, [listing.packages]);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer flex flex-col"
      onClick={() => onViewDetails(listing)}
    >
      <div className="relative">
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">{listing.category}</div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-neutral truncate mb-1 group-hover:text-primary">{listing.title}</h3>
        <p className="text-sm text-neutral-light flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-1 text-neutral-lighter" />
          {listing.city}, {listing.province}
        </p>
        <div className="flex items-center text-sm mb-4">
          <StarRating rating={listing.rating} />
          <span className="text-neutral-lighter ml-2">({listing.reviewsCount} reseñas)</span>
        </div>
        <div 
            className="flex items-center space-x-2 mb-4 p-1 -ml-1 rounded-md hover:bg-gray-100 transition-colors"
            onClick={handleProviderClick}
        >
          <img src={listing.provider.avatarUrl} alt={listing.provider.name} className="w-8 h-8 rounded-full"/>
          <div className="text-sm">
            <p className="font-medium text-neutral flex items-center">
              {listing.provider.name}
              {listing.provider.verified && <ShieldCheck className="w-4 h-4 text-green-500 ml-1" />}
            </p>
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-baseline justify-end">
             <span className="text-xs text-neutral-light mr-1">A PARTIR DE</span>
             <span className="text-2xl font-bold text-neutral">${minPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;