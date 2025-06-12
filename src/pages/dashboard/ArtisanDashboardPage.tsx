import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BarChart3, ShoppingBag, Package, Users, CreditCard, ArrowUp, ArrowDown } from 'lucide-react';

const ArtisanDashboardPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [stats, setStats] = useState({
    revenue: { total: 0, change: 0 },
    orders: { total: 0, change: 0 },
    products: { total: 0, change: 0 },
    customers: { total: 0, change: 0 }
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll use mock data
    setStats({
      revenue: { total: 1254.89, change: 12.5 },
      orders: { total: 25, change: 8.3 },
      products: { total: 12, change: 16.7 },
      customers: { total: 18, change: -5.2 }
    });

    setRecentOrders([
      { id: 'ORD123456', customer: 'Emma Johnson', date: '2023-05-01', amount: 129.99, status: 'delivered' },
      { id: 'ORD789012', customer: 'James Wilson', date: '2023-05-02', amount: 75.50, status: 'processing' },
      { id: 'ORD345678', customer: 'Sophia Brown', date: '2023-05-03', amount: 49.99, status: 'processing' },
      { id: 'ORD901234', customer: 'William Lee', date: '2023-05-04', amount: 99.99, status: 'pending' }
    ]);
  }, []);

  // Redirect if not authenticated or not an artisan
  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (!isLoading && (!isAuthenticated || user?.role !== 'artisan')) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-2">
        Dashboard
      </h1>
      
      <p className="text-neutral-600 mb-8">
        Welcome back, {user?.name}
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-medium text-neutral-800">
                ${stats.revenue.total.toFixed(2)}
              </h3>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <CreditCard className="text-primary-600" size={20} />
            </div>
          </div>
          <div className={`flex items-center mt-4 text-sm ${
            stats.revenue.change >= 0 ? 'text-accent-600' : 'text-red-600'
          }`}>
            {stats.revenue.change >= 0 ? (
              <ArrowUp size={16} className="mr-1" />
            ) : (
              <ArrowDown size={16} className="mr-1" />
            )}
            <span>{Math.abs(stats.revenue.change)}% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Total Orders</p>
              <h3 className="text-2xl font-medium text-neutral-800">
                {stats.orders.total}
              </h3>
            </div>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <ShoppingBag className="text-secondary-600" size={20} />
            </div>
          </div>
          <div className={`flex items-center mt-4 text-sm ${
            stats.orders.change >= 0 ? 'text-accent-600' : 'text-red-600'
          }`}>
            {stats.orders.change >= 0 ? (
              <ArrowUp size={16} className="mr-1" />
            ) : (
              <ArrowDown size={16} className="mr-1" />
            )}
            <span>{Math.abs(stats.orders.change)}% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Active Products</p>
              <h3 className="text-2xl font-medium text-neutral-800">
                {stats.products.total}
              </h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Package className="text-yellow-600" size={20} />
            </div>
          </div>
          <div className={`flex items-center mt-4 text-sm ${
            stats.products.change >= 0 ? 'text-accent-600' : 'text-red-600'
          }`}>
            {stats.products.change >= 0 ? (
              <ArrowUp size={16} className="mr-1" />
            ) : (
              <ArrowDown size={16} className="mr-1" />
            )}
            <span>{Math.abs(stats.products.change)}% from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Total Customers</p>
              <h3 className="text-2xl font-medium text-neutral-800">
                {stats.customers.total}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
          </div>
          <div className={`flex items-center mt-4 text-sm ${
            stats.customers.change >= 0 ? 'text-accent-600' : 'text-red-600'
          }`}>
            {stats.customers.change >= 0 ? (
              <ArrowUp size={16} className="mr-1" />
            ) : (
              <ArrowDown size={16} className="mr-1" />
            )}
            <span>{Math.abs(stats.customers.change)}% from last month</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-neutral-800">Recent Orders</h2>
              <Link to="/dashboard/orders" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Quick actions */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-neutral-800 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <Link
                to="/dashboard/products/new"
                className="block w-full bg-primary-50 text-primary-700 hover:bg-primary-100 px-4 py-3 rounded-md flex items-center"
              >
                <Package size={18} className="mr-3" />
                Add New Product
              </Link>
              
              <Link
                to="/dashboard/orders"
                className="block w-full bg-neutral-50 text-neutral-700 hover:bg-neutral-100 px-4 py-3 rounded-md flex items-center"
              >
                <ShoppingBag size={18} className="mr-3" />
                Manage Orders
              </Link>
              
              <Link
                to="/dashboard/products"
                className="block w-full bg-neutral-50 text-neutral-700 hover:bg-neutral-100 px-4 py-3 rounded-md flex items-center"
              >
                <Package size={18} className="mr-3" />
                Update Inventory
              </Link>
            </div>
          </div>
          
          {/* Sales overview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-neutral-800">Sales Overview</h2>
              <div className="text-sm text-neutral-500">This Month</div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-neutral-600">Generated Revenue</div>
                <div className="text-sm font-medium text-neutral-800">${stats.revenue.total.toFixed(2)}</div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-neutral-600">Completed Orders</div>
                <div className="text-sm font-medium text-neutral-800">
                  {recentOrders.filter(o => o.status === 'delivered').length}/{recentOrders.length}
                </div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-secondary-600 h-2 rounded-full" 
                  style={{ 
                    width: `${(recentOrders.filter(o => o.status === 'delivered').length / recentOrders.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                to="/dashboard/analytics" 
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center justify-center"
              >
                <BarChart3 size={16} className="mr-1" />
                View Detailed Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboardPage;