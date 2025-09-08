
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={`w-4 h-4 ${
              starValue <= rating ? 'text-secondary fill-current' : 'text-gray-300'
            }`}
          />
        );
      })}
      <span className="text-sm font-bold text-neutral-light ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
