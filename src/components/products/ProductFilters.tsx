import React, { useState } from 'react';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  inStock: boolean;
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
  availableCategories: string[];
  minPrice: number;
  maxPrice: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  initialFilters,
  availableCategories,
  minPrice,
  maxPrice
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    priceRange: true,
    availability: true
  });

  const [filters, setFilters] = useState<FilterOptions>({
    categories: initialFilters?.categories || [],
    priceRange: initialFilters?.priceRange || [minPrice, maxPrice],
    inStock: initialFilters?.inStock || false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const updatedFilters = {
      ...filters,
      categories: updatedCategories
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const updatedPriceRange: [number, number] = [...filters.priceRange] as [number, number];
    
    if (type === 'min') {
      updatedPriceRange[0] = value;
    } else {
      updatedPriceRange[1] = value;
    }
    
    const updatedFilters = {
      ...filters,
      priceRange: updatedPriceRange
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleInStockChange = () => {
    const updatedFilters = {
      ...filters,
      inStock: !filters.inStock
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const resetFilters: FilterOptions = {
      categories: [],
      priceRange: [minPrice, maxPrice] as [number, number],
      inStock: false
    };

    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters =
    filters.categories.length > 0 || 
    filters.priceRange[0] > minPrice || 
    filters.priceRange[1] < maxPrice || 
    filters.inStock;

  // Content for filter sections - reused in both desktop and mobile views
  const categoriesSection = (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => toggleSection('categories')}
      >
        <h3 className="font-medium text-neutral-800">Categories</h3>
        {expandedSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {expandedSections.categories && (
        <div className="space-y-2">
          {availableCategories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-sm text-neutral-700">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const priceRangeSection = (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => toggleSection('priceRange')}
      >
        <h3 className="font-medium text-neutral-800">Price Range</h3>
        {expandedSections.priceRange ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {expandedSections.priceRange && (
        <>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-neutral-500">
              ${filters.priceRange[0]}
            </span>
            <span className="text-sm text-neutral-500">
              ${filters.priceRange[1]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="min-price" className="sr-only">Minimum Price</label>
              <input
                type="number"
                id="min-price"
                min={minPrice}
                max={filters.priceRange[1]}
                value={filters.priceRange[0]}
                onChange={e => handlePriceChange('min', Number(e.target.value))}
                className="w-full p-2 text-sm border border-neutral-300 rounded-md"
                placeholder="Min"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="sr-only">Maximum Price</label>
              <input
                type="number"
                id="max-price"
                min={filters.priceRange[0]}
                max={maxPrice}
                value={filters.priceRange[1]}
                onChange={e => handlePriceChange('max', Number(e.target.value))}
                className="w-full p-2 text-sm border border-neutral-300 rounded-md"
                placeholder="Max"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );

  const availabilitySection = (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => toggleSection('availability')}
      >
        <h3 className="font-medium text-neutral-800">Availability</h3>
        {expandedSections.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {expandedSections.availability && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="in-stock"
            checked={filters.inStock}
            onChange={handleInStockChange}
            className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="in-stock" className="ml-2 text-sm text-neutral-700">
            In Stock Only
          </label>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center justify-center w-full py-2 px-4 border border-neutral-300 rounded-md bg-white text-neutral-700 hover:bg-neutral-50"
        >
          <Filter size={16} className="mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 bg-primary-600 text-white text-xs rounded-full px-2 py-0.5">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:block">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-neutral-800">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="border-t border-neutral-200 pt-4">
            {categoriesSection}
            {priceRangeSection}
            {availabilitySection}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isMobileFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 right-0 max-w-full flex transition-transform transform ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
              <div className="p-4 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-neutral-800">Filters</h2>
                  <button
                    type="button"
                    className="text-neutral-500 hover:text-neutral-700"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-2 text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              <div className="p-4">
                {categoriesSection}
                {priceRangeSection}
                {availabilitySection}
              </div>

              <div className="mt-auto p-4 border-t border-neutral-200">
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;