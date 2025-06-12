import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    priceRange: [0, 1000],
    inStock: false
  });

  // Get all available categories and price range
  const allCategories = Array.from(new Set(mockProducts.map(product => product.category)));
  const minPrice = Math.min(...mockProducts.map(product => product.price));
  const maxPrice = Math.max(...mockProducts.map(product => product.price));

  useEffect(() => {
    // In a real app, this would be an API call with filters
    // For this demo, we'll use the mock data and filter locally
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // When products change or filters change, apply filtering
    filterProducts();
  }, [products, filters, searchQuery]);

  const filterProducts = () => {
    let filtered = [...products];

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.artisanName.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      product => 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1]
    );

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-8">
        {searchQuery 
          ? `Search Results for "${searchQuery}"` 
          : categoryParam 
            ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Products`
            : 'All Products'
        }
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <ProductFilters 
            onFilterChange={handleFilterChange}
            initialFilters={{
              ...filters,
              priceRange: [
                typeof filters.priceRange[0] === 'number' ? filters.priceRange[0] : minPrice,
                typeof filters.priceRange[1] === 'number' ? filters.priceRange[1] : maxPrice
              ] as [number, number]
            }}
            availableCategories={allCategories}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>

        {/* Products grid */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;