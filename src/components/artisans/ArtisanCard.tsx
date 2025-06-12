import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Artisan } from '../../types';

interface ArtisanCardProps {
  artisan: Artisan;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
  return (
    <Link 
      to={`/artisans/${artisan.id}`} 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative h-40 overflow-hidden bg-secondary-100">
        <img 
          src={artisan.profileImage || 'https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
          alt={artisan.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center mb-1">
            <MapPin size={14} className="mr-1" />
            <span className="text-xs">{artisan.location}</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star 
                  key={index} 
                  size={12} 
                  className={index < Math.floor(artisan.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs">{artisan.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors duration-300">
          {artisan.name}
        </h3>
        
        <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
          {artisan.bio}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {artisan.specialties.slice(0, 3).map((specialty, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs bg-secondary-50 text-secondary-700 rounded-full"
            >
              {specialty}
            </span>
          ))}
          {artisan.specialties.length > 3 && (
            <span className="px-2 py-1 text-xs bg-neutral-50 text-neutral-500 rounded-full">
              +{artisan.specialties.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ArtisanCard;