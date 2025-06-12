import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative pt-[100%] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />

        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 hover:bg-primary-50 transition-all duration-300"
          aria-label="Add to cart"
        >
          <ShoppingBag size={20} className="text-primary-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-primary-600 font-medium">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <Link 
            to={`/artisans/${product.artisanId}`} 
            className="text-xs text-neutral-600 hover:text-primary-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            By {product.artisanName}
          </Link>
          
          <div className="text-xs text-neutral-500">
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
    </Link>
  );
};

export default ProductCard;