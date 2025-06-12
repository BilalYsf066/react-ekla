import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/products/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll use the mock data
    setIsLoading(true);
    
    // Find the product with the matching ID
    const foundProduct = mockProducts.find(p => p.id === id);
    
    // Simulate API request
    setTimeout(() => {
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products (same category, excluding current product)
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== id)
          .slice(0, 4);
        
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }, 500);

    // Reset quantity and active image when product changes
    setQuantity(1);
    setActiveImage(0);
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && product && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-1/4 mb-8"></div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-neutral-200 rounded-lg aspect-square mb-4"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="bg-neutral-200 rounded-lg w-20 h-20"></div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-8"></div>
              
              <div className="h-10 bg-neutral-200 rounded w-full mb-4"></div>
              <div className="h-12 bg-neutral-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium text-neutral-800 mb-4">Product Not Found</h1>
        <p className="text-neutral-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/products" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft size={16} className="mr-2" /> 
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/products" 
        className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-8"
      >
        <ArrowLeft size={16} className="mr-2" /> 
        Back to Products
      </Link>
      
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Product images */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden mb-4 aspect-square">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-contain" 
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                    activeImage === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star 
                  key={index} 
                  size={16} 
                  className={index < Math.floor(product.rating) 
                    ? "fill-amber-400 text-amber-400" 
                    : "text-neutral-300"
                  }
                />
              ))}
              <span className="ml-2 text-sm text-neutral-600">
                {product.rating.toFixed(1)}
              </span>
            </div>
            
            <div className="text-sm">
              <Link 
                to={`/artisans/${product.artisanId}`}
                className="text-primary-600 hover:text-primary-700"
              >
                By {product.artisanName}
              </Link>
            </div>
          </div>
          
          <div className="text-2xl font-medium text-neutral-800 mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-neutral-700 mb-6">
            {product.description}
          </p>
          
          <div className="mb-6">
            <div className="text-sm font-medium text-neutral-700 mb-2">Quantity</div>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className={`w-10 h-10 flex items-center justify-center rounded-l-md border border-neutral-300 ${
                  quantity <= 1 ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                -
              </button>
              <div className="w-12 h-10 flex items-center justify-center border-t border-b border-neutral-300">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={product.stock <= quantity}
                className={`w-10 h-10 flex items-center justify-center rounded-r-md border border-neutral-300 ${
                  product.stock <= quantity ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                +
              </button>
              
              <div className="ml-4 text-sm text-neutral-600">
                {product.stock > 10 ? (
                  <span className="text-accent-600">In Stock</span>
                ) : product.stock > 0 ? (
                  <span className="text-amber-600">Only {product.stock} left</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center ${
                product.stock === 0
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              <ShoppingBag size={18} className="mr-2" />
              Add to Cart
            </button>
            
            <button
              className="w-12 h-12 flex items-center justify-center rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50"
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
          </div>
          
          <div className="border-t border-neutral-200 pt-6">
            <div className="text-sm">
              <span className="font-medium">Category:</span>{' '}
              <Link 
                to={`/products?category=${product.category}`}
                className="text-primary-600 hover:text-primary-700"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-neutral-200 pt-12">
          <h2 className="text-2xl font-display font-semibold text-neutral-800 mb-8">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;