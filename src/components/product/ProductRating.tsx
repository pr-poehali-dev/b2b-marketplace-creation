import React from 'react';
import Icon from '@/components/ui/icon';

interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showReviewCount?: boolean;
  className?: string;
}

export default function ProductRating({ 
  rating, 
  reviewCount = 0, 
  size = 'md', 
  showReviewCount = true,
  className = '' 
}: ProductRatingProps) {
  const sizeClasses = {
    sm: { star: 12, text: 'text-xs' },
    md: { star: 16, text: 'text-sm' },
    lg: { star: 20, text: 'text-base' }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Полные звезды
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon 
          key={`full-${i}`} 
          name="Star" 
          size={sizeClasses[size].star} 
          className="text-yellow-400 fill-current" 
        />
      );
    }

    // Половина звезды
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Icon 
            name="Star" 
            size={sizeClasses[size].star} 
            className="text-gray-300" 
          />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Icon 
              name="Star" 
              size={sizeClasses[size].star} 
              className="text-yellow-400 fill-current" 
            />
          </div>
        </div>
      );
    }

    // Пустые звезды
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon 
          key={`empty-${i}`} 
          name="Star" 
          size={sizeClasses[size].star} 
          className="text-gray-300" 
        />
      );
    }

    return stars;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>
      
      {showReviewCount && (
        <div className="flex items-center gap-1">
          <span className={`font-medium text-gray-900 ${sizeClasses[size].text}`}>
            {rating.toFixed(1)}
          </span>
          <span className={`text-gray-500 ${sizeClasses[size].text}`}>
            ({reviewCount})
          </span>
        </div>
      )}
    </div>
  );
}