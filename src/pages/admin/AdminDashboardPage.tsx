import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const stats = {
    totalUsers: 256,
    totalOrders: 1289,
    totalRevenue: 45678.90,
    totalProducts: 432,
    userGrowth: 12.5,
    revenueGrowth: -2.3
  };

  return (
    <div>
      <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Total Users</p>
              <h3 className="text-2xl font-medium text-neutral-800">
                {stats.totalUsers}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-accent-600">
            <TrendingUp size={16} className="mr-1" />
            <span>{stats.userGrowth}% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Total Orders</p>
              <h3 className="text-2xl font-medium text-neutral-800">
                {stats.totalOrders}
              </h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <ShoppingBag className="text-amber-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-neutral-600">
            <TrendingUp size={16} className="mr-1" />
            <span>8.3% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-medium text-neutral-800">
                ${stats.totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="bg-accent-100 p-3 rounded-lg">
              <DollarSign className="text-accent-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-red-600">
            <TrendingDown size={16} className="mr-1" />
            <span>{Math.abs(stats.revenueGrowth)}% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Total Products</p>
              <h3 className="text-2xl font-medium text-neutral-800">
                {stats.totalProducts}
              </h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="text-purple-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-neutral-600">
            <TrendingUp size={16} className="mr-1" />
            <span>5.2% from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-medium text-neutral-800 mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {[
            { type: 'user', action: 'New user registration', time: '5 minutes ago' },
            { type: 'order', action: 'New order #12345', time: '15 minutes ago' },
            { type: 'product', action: 'Product "Handwoven Basket" updated', time: '1 hour ago' },
            { type: 'user', action: 'User profile updated', time: '2 hours ago' },
          ].map((activity, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0"
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'order' ? 'bg-amber-100' :
                  'bg-purple-100'
                }`}>
                  {activity.type === 'user' ? (
                    <Users size={14} className="text-blue-600" />
                  ) : activity.type === 'order' ? (
                    <ShoppingBag size={14} className="text-amber-600" />
                  ) : (
                    <Package size={14} className="text-purple-600" />
                  )}
                </div>
                <span className="ml-3 text-neutral-700">{activity.action}</span>
              </div>
              <span className="text-sm text-neutral-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;