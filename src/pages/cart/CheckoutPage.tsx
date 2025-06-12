import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartSummary from '../../components/cart/CartSummary';

const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'country'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Payment validation
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.cardName) {
        newErrors.cardName = 'Name on card is required';
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please use MM/YY format';
      }
      
      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to process the order
    setTimeout(() => {
      clearCart();
      navigate('/profile', { 
        state: { 
          orderSuccess: true,
          orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`
        } 
      });
      setIsSubmitting(false);
    }, 1500);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-8">
        Checkout
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout form */}
        <div className="lg:flex-1">
          <form onSubmit={handleSubmit}>
            {/* Shipping information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-medium text-neutral-800 mb-4">
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                  Street Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
                    State/Province*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.state ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-1">
                    ZIP/Postal Code*
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.zipCode ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
                    Country*
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.country ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="NG">Nigeria</option>
                    <option value="GH">Ghana</option>
                    <option value="SN">Senegal</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Payment information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-medium text-neutral-800 mb-4">
                Payment Method
              </h2>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    id="credit-card"
                    name="paymentMethod"
                    type="radio"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleChange}
                    className="h-4 w-4 border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="credit-card" className="ml-2 block text-sm font-medium text-neutral-700">
                    Credit / Debit Card
                  </label>
                </div>
              </div>
              
              {formData.paymentMethod === 'credit-card' && (
                <div className="pl-6 border-l-2 border-neutral-200">
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                      Card Number*
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="0000 0000 0000 0000"
                      className={`w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Name on Card*
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.cardName ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-neutral-700 mb-1">
                        Expiry Date* (MM/YY)
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-3 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-neutral-700 mb-1">
                        CVV*
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className={`w-full px-3 py-2 border ${errors.cvv ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                    className="h-4 w-4 border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="paypal" className="ml-2 block text-sm font-medium text-neutral-700">
                    PayPal
                  </label>
                </div>
              </div>
            </div>
            
            <div className="lg:hidden mb-6">
              <CartSummary isCheckout={true} />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium text-white ${
                  isSubmitting ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
                } transition-colors`}
              >
                {isSubmitting ? 'Processing Order...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Order summary */}
        <div className="hidden lg:block lg:w-80">
          <CartSummary isCheckout={true} />
          
          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className={`mt-4 w-full px-6 py-3 rounded-lg font-medium text-white ${
              isSubmitting ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
            } transition-colors`}
          >
            {isSubmitting ? 'Processing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;