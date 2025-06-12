import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import { Artisan, Product } from '../types';
import { mockArtisans, mockProducts } from '../data/mockData';

const ArtisanDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll use the mock data
    setIsLoading(true);
    
    // Find the artisan with the matching ID
    const foundArtisan = mockArtisans.find(a => a.id === id);
    
    // Simulate API request
    setTimeout(() => {
      if (foundArtisan) {
        setArtisan(foundArtisan);
        
        // Get products by this artisan
        const products = mockProducts.filter(p => p.artisanId === id);
        setArtisanProducts(products);
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-1/4 mb-8"></div>
          
          <div className="bg-neutral-200 h-64 rounded-lg mb-6"></div>
          
          <div className="h-8 bg-neutral-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/4 mb-6"></div>
          
          <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-neutral-200 rounded w-3/4 mb-8"></div>
          
          <div className="h-8 bg-neutral-200 rounded w-1/4 mb-6"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-neutral-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium text-neutral-800 mb-4">Artisan Not Found</h1>
        <p className="text-neutral-600 mb-8">The artisan you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/artisans" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft size={16} className="mr-2" /> 
          Back to Artisans
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/artisans" 
        className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-8"
      >
        <ArrowLeft size={16} className="mr-2" /> 
        Back to Artisans
      </Link>
      
      {/* Artisan header */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-8">
        <img 
          src={artisan.profileImage || "https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
          alt={artisan.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center mb-1">
            <MapPin size={16} className="text-white mr-1" />
            <span className="text-white">{artisan.location}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Artisan info */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-display font-semibold text-neutral-800 mb-2">
              {artisan.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star 
                    key={index} 
                    size={16} 
                    className={index < Math.floor(artisan.rating) 
                      ? "fill-amber-400 text-amber-400" 
                      : "text-neutral-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-600">
                {artisan.rating.toFixed(1)}
              </span>
            </div>
            
            <p className="text-neutral-700 mb-6">
              {artisan.bio}
            </p>
            
            <div className="mb-6">
              <h2 className="font-medium text-neutral-800 mb-2">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {artisan.specialties.map((specialty, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs bg-secondary-50 text-secondary-700 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="font-medium text-neutral-800 mb-2">Contact</h2>
              <a 
                href={`mailto:${artisan.email}`} 
                className="text-primary-600 hover:text-primary-700"
              >
                {artisan.email}
              </a>
            </div>
            
            <div>
              <h2 className="font-medium text-neutral-800 mb-2">Joined</h2>
              <p className="text-neutral-600">{artisan.joinedDate}</p>
            </div>
          </div>
        </div>
        
        {/* Artisan products */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-display font-semibold text-neutral-800 mb-6">
            Products by {artisan.name}
          </h2>
          
          {artisanProducts.length > 0 ? (
            <ProductGrid products={artisanProducts} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-neutral-600 mb-4">This artisan hasn't added any products yet.</p>
              <p className="text-sm text-neutral-500">Check back soon for new items!</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Related artisans */}
      <div className="border-t border-neutral-200 pt-12">
        <h2 className="text-2xl font-display font-semibold text-neutral-800 mb-6">
          You May Also Like
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Show 4 other artisans with similar specialties */}
          {mockArtisans
            .filter(a => a.id !== artisan.id && a.specialties.some(s => artisan.specialties.includes(s)))
            .slice(0, 4)
            .map(relatedArtisan => (
              <Link 
                key={relatedArtisan.id}
                to={`/artisans/${relatedArtisan.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-40 overflow-hidden bg-secondary-100">
                  <img 
                    src={relatedArtisan.profileImage || "https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                    alt={relatedArtisan.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors duration-300">
                    {relatedArtisan.name}
                  </h3>
                  
                  <p className="text-sm text-neutral-500 line-clamp-1">
                    {relatedArtisan.location}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDetailPage;