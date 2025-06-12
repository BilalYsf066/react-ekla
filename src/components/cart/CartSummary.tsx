import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface CartSummaryProps {
  isCheckout?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ isCheckout = false }) => {
  const { items, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Calculate subtotal, shipping, and tax
  const subtotal = totalPrice;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-neutral-800 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-accent-600">Free</span>
          ) : (
            <span>${shipping.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex justify-between text-neutral-600">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        {subtotal < 50 && shipping > 0 && (
          <div className="text-xs text-accent-600 italic">
            Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping
          </div>
        )}
        
        <div className="border-t border-neutral-200 pt-3 mt-3">
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {!isCheckout && (
        <button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className={`mt-6 w-full py-3 rounded-lg font-medium transition-colors 
            ${items.length === 0 
              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
              : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
        >
          Proceed to Checkout
        </button>
      )}
      
      <div className="mt-4 text-xs text-neutral-500">
        <p>We accept:</p>
        <div className="flex mt-2 space-x-2">
          <div className="w-10 h-6 bg-neutral-200 rounded"></div>
          <div className="w-10 h-6 bg-neutral-200 rounded"></div>
          <div className="w-10 h-6 bg-neutral-200 rounded"></div>
          <div className="w-10 h-6 bg-neutral-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;