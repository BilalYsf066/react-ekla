import React from 'react';
import { Artisan } from '../../types';
import ArtisanCard from './ArtisanCard';

interface ArtisanGridProps {
  artisans: Artisan[];
  isLoading?: boolean;
}

const ArtisanGrid: React.FC<ArtisanGridProps> = ({ artisans, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="bg-neutral-200 h-40"></div>
            <div className="p-4">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-neutral-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!artisans.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-xl font-medium text-neutral-700 mb-2">No artisans found</h3>
        <p className="text-neutral-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {artisans.map(artisan => (
        <ArtisanCard key={artisan.id} artisan={artisan} />
      ))}
    </div>
  );
};

export default ArtisanGrid;