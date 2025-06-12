import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, User, Package, CreditCard, ShoppingBag } from 'lucide-react';
import { Order } from '../../types';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (location.state) {
      const state = location.state as { orderSuccess?: boolean; orderNumber?: string };
      if (state.orderSuccess) {
        setOrderSuccess(true);
        setOrderNumber(state.orderNumber || '');
      }
    }

    // In a real app, this would be an API call to fetch user orders
    // For this demo, we'll create mock orders
    if (isAuthenticated) {
      setOrders([
        {
          id: 'ORD123456',
          userId: user?.id || '',
          status: 'delivered',
          total: 129.99,
          createdAt: '2023-04-15T14:30:00Z',
          updatedAt: '2023-04-18T09:15:00Z',
          items: []
        },
        {
          id: 'ORD789012',
          userId: user?.id || '',
          status: 'processing',
          total: 75.50,
          createdAt: '2023-05-02T11:45:00Z',
          updatedAt: '2023-05-02T11:45:00Z',
          items: []
        }
      ]);
    }
  }, [location, isAuthenticated]);

  // Redirect if not authenticated
  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/profile' }} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {orderSuccess && (
        <div className="mb-8 bg-accent-50 text-accent-800 p-4 rounded-lg flex items-start">
          <CheckCircle className="flex-shrink-0 mt-0.5 text-accent-600" size={20} />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-accent-800">Order Placed Successfully!</h3>
            <p className="mt-1">
              Thank you for your order. Your order number is <strong>{orderNumber}</strong>.
              You will receive an email confirmation shortly.
            </p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-2">
        My Account
      </h1>
      
      <p className="text-neutral-600 mb-8">
        Welcome back, {user?.name}
      </p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar navigation */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="text-primary-600" size={24} />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-neutral-800">{user?.name}</h3>
                  <p className="text-sm text-neutral-500">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                      activeTab === 'orders' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Package size={18} className="mr-3" />
                    My Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                      activeTab === 'profile' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <User size={18} className="mr-3" />
                    Profile Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('payment')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                      activeTab === 'payment' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <CreditCard size={18} className="mr-3" />
                    Payment Methods
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                      activeTab === 'wishlist' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <ShoppingBag size={18} className="mr-3" />
                    Wishlist
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium text-neutral-800 mb-6">My Orders</h2>
              
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border border-neutral-200 rounded-md overflow-hidden">
                      <div className="bg-neutral-50 px-4 py-3 flex flex-wrap justify-between items-center">
                        <div>
                          <span className="text-sm text-neutral-500">Order #</span>
                          <span className="ml-2 font-medium">{order.id}</span>
                        </div>
                        
                        <div>
                          <span className="text-sm text-neutral-500">Placed on</span>
                          <span className="ml-2">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-sm text-neutral-500">Total</span>
                          <span className="ml-2 font-medium">${order.total.toFixed(2)}</span>
                        </div>
                        
                        <div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${order.status === 'delivered' ? 'bg-accent-100 text-accent-800' : 
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-neutral-100 text-neutral-800'
                              }
                            `}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <button className="text-sm text-primary-600 hover:text-primary-700">
                          View Order Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package size={48} className="mx-auto text-neutral-400 mb-4" />
                  <h3 className="text-lg font-medium text-neutral-700 mb-1">No Orders Yet</h3>
                  <p className="text-neutral-500">
                    When you place orders, they will appear here.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium text-neutral-800 mb-6">Profile Settings</h2>
              
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      defaultValue={user?.name.split(' ')[0]}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      defaultValue={user?.name.split(' ')[1]}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    defaultValue={user?.email}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="border-t border-neutral-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium text-neutral-800 mb-4">Change Password</h3>
                  
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter current password"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'payment' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium text-neutral-800 mb-6">Payment Methods</h2>
              
              <div className="text-center py-8">
                <CreditCard size={48} className="mx-auto text-neutral-400 mb-4" />
                <h3 className="text-lg font-medium text-neutral-700 mb-1">No Payment Methods</h3>
                <p className="text-neutral-500 mb-4">
                  You haven't added any payment methods yet.
                </p>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors">
                  Add Payment Method
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium text-neutral-800 mb-6">My Wishlist</h2>
              
              <div className="text-center py-8">
                <ShoppingBag size={48} className="mx-auto text-neutral-400 mb-4" />
                <h3 className="text-lg font-medium text-neutral-700 mb-1">Your Wishlist is Empty</h3>
                <p className="text-neutral-500 mb-4">
                  Save items you're interested in for later.
                </p>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors">
                  Explore Products
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;