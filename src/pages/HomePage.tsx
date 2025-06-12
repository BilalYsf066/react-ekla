import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import ArtisanCard from '../components/artisans/ArtisanCard';
import { Product, Artisan } from '../types';
import { mockProducts, mockArtisans } from '../data/mockData';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredArtisans, setFeaturedArtisans] = useState<Artisan[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll use the mock data
    setFeaturedProducts(mockProducts.slice(0, 4));
    setFeaturedArtisans(mockArtisans.slice(0, 4));
  }, []);

  return (
    <div>
      {/* Hero section */}
      <section className="relative min-h-[70vh] bg-gradient-to-r from-secondary-900 to-secondary-700 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/7298039/pexels-photo-7298039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="West African artisanal crafts" 
            className="w-full h-full object-cover object-center opacity-20"
          />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Discover Authentic <br />
              <span className="text-primary-400">West African</span> Artisanal Crafts
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Connect directly with talented artisans and bring the rich culture and craftsmanship 
              of West Africa into your home.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                to="/artisans" 
                className="px-6 py-3 bg-white bg-opacity-10 text-white rounded-lg font-medium hover:bg-opacity-20 transition-colors"
              >
                Meet Our Artisans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-semibold text-neutral-800">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-semibold text-neutral-800 mb-8 text-center">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { name: 'Home Decor', image: 'https://images.pexels.com/photos/4996639/pexels-photo-4996639.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Fashion', image: 'https://images.pexels.com/photos/6920103/pexels-photo-6920103.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Jewelry', image: 'https://images.pexels.com/photos/234798/pexels-photo-234798.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Art', image: 'https://images.pexels.com/photos/3964307/pexels-photo-3964307.jpeg?auto=compress&cs=tinysrgb&w=600' }
            ].map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="relative rounded-lg overflow-hidden group aspect-[4/3]"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured artisans section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-semibold text-neutral-800">
            Meet Our Artisans
          </h2>
          <Link
            to="/artisans"
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredArtisans.map(artisan => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </section>

      {/* Testimonial section */}
      <section className="bg-secondary-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-semibold text-neutral-800 mb-8 text-center">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The quality of craftsmanship in the items I purchased is exceptional. It's wonderful to have direct connections with the artisans who make these beautiful pieces.",
                author: "Amina K.",
                location: "London, UK"
              },
              {
                text: "I've been looking for authentic West African art for my home for years. Ekla not only provided me with beautiful pieces but also the stories behind them.",
                author: "David M.",
                location: "Toronto, Canada"
              },
              {
                text: "As someone from West Africa now living abroad, Ekla helps me stay connected to my roots. The platform is easy to use and the products are as authentic as they come.",
                author: "Kwame O.",
                location: "New York, USA"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="mt-auto">
                  <p className="font-medium text-neutral-800">{testimonial.author}</p>
                  <p className="text-sm text-neutral-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-primary-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
            Ready to discover unique handcrafted treasures?
          </h2>
          <p className="text-white text-opacity-90 max-w-2xl mx-auto mb-8">
            Join our community of conscious consumers and talented artisans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/products" 
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
            >
              Explore Products
            </Link>
            <Link 
              to="/register/artisan" 
              className="px-6 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Join as an Artisan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;