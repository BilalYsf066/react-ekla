import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(product.id);
    } else if (newQuantity <= product.stock) {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start border-b border-neutral-200 py-6">
      {/* Product image */}
      <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-neutral-100 rounded-md overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product details */}
      <div className="flex-1 mt-4 sm:mt-0 sm:ml-6">
        <div className="flex justify-between">
          <Link 
            to={`/products/${product.id}`}
            className="text-lg font-medium text-neutral-800 hover:text-primary-600 transition-colors"
          >
            {product.name}
          </Link>
          <span className="text-lg font-medium text-neutral-800">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>

        <Link 
          to={`/artisans/${product.artisanId}`}
          className="text-sm text-neutral-500 hover:text-primary-600 transition-colors"
        >
          By {product.artisanName}
        </Link>

        <div className="mt-2 sm:mt-4 flex justify-between items-center">
          <div className="flex items-center border border-neutral-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-2 py-1 text-neutral-500 hover:text-primary-600 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1 text-neutral-700 min-w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className={`px-2 py-1 transition-colors ${
                quantity < product.stock
                  ? 'text-neutral-500 hover:text-primary-600'
                  : 'text-neutral-300 cursor-not-allowed'
              }`}
              disabled={quantity >= product.stock}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            className="text-neutral-500 hover:text-red-600 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;