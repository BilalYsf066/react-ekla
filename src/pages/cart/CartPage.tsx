import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';

const CartPage: React.FC = () => {
  const { items, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-6">
            <ShoppingBag size={24} className="text-neutral-500" />
          </div>
          
          <h1 className="text-2xl font-display font-semibold text-neutral-800 mb-4">
            Your Cart is Empty
          </h1>
          
          <p className="text-neutral-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
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
        Continue Shopping
      </Link>
      
      <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-8">
        Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="lg:flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {items.map(item => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
        </div>
        
        {/* Cart summary */}
        <div className="lg:w-80">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;