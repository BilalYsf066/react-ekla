import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ArtisanGrid from '../components/artisans/ArtisanGrid';
import { Artisan } from '../types';
import { mockArtisans } from '../data/mockData';

const ArtisansPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll use the mock data
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setArtisans(mockArtisans);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // When artisans change or search query changes, apply filtering
    if (artisans.length) {
      filterArtisans();
    }
  }, [artisans, searchQuery]);

  const filterArtisans = () => {
    let filtered = [...artisans];

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        artisan => 
          artisan.name.toLowerCase().includes(query) || 
          artisan.bio.toLowerCase().includes(query) ||
          artisan.location.toLowerCase().includes(query) ||
          artisan.specialties.some(specialty => 
            specialty.toLowerCase().includes(query)
          )
      );
    }

    setFilteredArtisans(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: localSearchQuery });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-4">
        Our Artisans
      </h1>
      
      <p className="text-neutral-600 max-w-3xl mb-8">
        Meet the talented craftspeople behind our products. Each artisan brings years of tradition, 
        skill, and passion to their work, creating unique pieces that tell a story.
      </p>

      {/* Search form */}
      <form onSubmit={handleSearch} className="relative max-w-xl mb-8">
        <input
          type="text"
          placeholder="Search artisans by name, location, or specialty..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          className="w-full py-3 px-4 pr-12 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary-600"
        >
          <Search size={20} />
        </button>
      </form>

      {/* Results */}
      <ArtisanGrid artisans={filteredArtisans} isLoading={isLoading} />
    </div>
  );
};

export default ArtisansPage;