import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Filter, CheckCircle, Truck, Clock, AlertTriangle, XCircle } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: { name: string; quantity: number; price: number }[];
}

const OrdersManagementPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll use mock data
    const mockOrders: Order[] = [
      {
        id: 'ORD123456',
        customer: 'Emma Johnson',
        email: 'emma.j@example.com',
        date: '2023-05-01',
        total: 129.99,
        status: 'delivered',
        items: [
          { name: 'Handwoven Basket', quantity: 1, price: 79.99 },
          { name: 'Wooden Sculpture', quantity: 1, price: 50.00 }
        ]
      },
      {
        id: 'ORD789012',
        customer: 'James Wilson',
        email: 'james.w@example.com',
        date: '2023-05-02',
        total: 75.50,
        status: 'processing',
        items: [
          { name: 'Beaded Necklace', quantity: 1, price: 45.50 },
          { name: 'Leather Bracelet', quantity: 2, price: 15.00 }
        ]
      },
      {
        id: 'ORD345678',
        customer: 'Sophia Brown',
        email: 'sophia.b@example.com',
        date: '2023-05-03',
        total: 49.99,
        status: 'shipped',
        items: [
          { name: 'Clay Pot', quantity: 1, price: 49.99 }
        ]
      },
      {
        id: 'ORD901234',
        customer: 'William Lee',
        email: 'william.l@example.com',
        date: '2023-05-04',
        total: 99.99,
        status: 'pending',
        items: [
          { name: 'Woven Rug', quantity: 1, price: 99.99 }
        ]
      },
      {
        id: 'ORD567890',
        customer: 'Olivia Garcia',
        email: 'olivia.g@example.com',
        date: '2023-05-05',
        total: 120.00,
        status: 'cancelled',
        items: [
          { name: 'Wall Hanging', quantity: 1, price: 65.00 },
          { name: 'Decorative Mask', quantity: 1, price: 55.00 }
        ]
      }
    ];
    
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    // Apply filters when search query or status filter changes
    let results = [...orders];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        order => 
          order.id.toLowerCase().includes(query) ||
          order.customer.toLowerCase().includes(query) ||
          order.email.toLowerCase().includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      results = results.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(results);
  }, [orders, searchQuery, statusFilter]);

  // Redirect if not authenticated or not an artisan
  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (!isLoading && (!isAuthenticated || user?.role !== 'artisan')) {
    return <Navigate to="/login" />;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled in the useEffect
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    // In a real app, this would be an API call
    // For this demo, we'll update the local state
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-amber-500" size={20} />;
      case 'processing':
        return <AlertTriangle className="text-blue-500" size={20} />;
      case 'shipped':
        return <Truck className="text-purple-500" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-accent-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-2">
        Orders
      </h1>
      
      <p className="text-neutral-600 mb-8">
        Manage customer orders and shipping
      </p>
      
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" 
              />
            </form>
          </div>
          
          <div className="flex items-center">
            <Filter size={18} className="text-neutral-500 mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Orders table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-800">{order.customer}</div>
                      <div className="text-xs text-neutral-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${order.status === 'delivered' ? 'bg-accent-100 text-accent-800' : 
                              order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-neutral-100 text-neutral-800'
                            }
                          `}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <AlertTriangle size={48} className="text-neutral-400 mb-4" />
                      <h3 className="text-lg font-medium text-neutral-700 mb-1">No orders found</h3>
                      <p className="text-neutral-500">
                        {searchQuery || statusFilter !== 'all' 
                          ? 'Try adjusting your search or filters'
                          : 'When you receive orders, they will appear here'
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Order detail modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-neutral-800">
                    Order {selectedOrder.id}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Placed on {new Date(selectedOrder.date).toLocaleDateString()}
                  </p>
                </div>
                
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  &times;
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-neutral-500 mb-2">Customer Information</h4>
                  <p className="text-neutral-800 font-medium">{selectedOrder.customer}</p>
                  <p className="text-neutral-600">{selectedOrder.email}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-500 mb-2">Order Status</h4>
                  <div className="flex items-center mb-4">
                    {getStatusIcon(selectedOrder.status)}
                    <span
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${selectedOrder.status === 'delivered' ? 'bg-accent-100 text-accent-800' : 
                          selectedOrder.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          selectedOrder.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          selectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-neutral-100 text-neutral-800'
                        }
                      `}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-2">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                        <button
                          key={status}
                          disabled={selectedOrder.status === status}
                          onClick={() => updateOrderStatus(selectedOrder.id, status as Order['status'])}
                          className={`px-3 py-1 text-xs rounded-full font-medium 
                            ${selectedOrder.status === status 
                              ? 'bg-neutral-200 text-neutral-600 cursor-not-allowed' 
                              : `${
                                  status === 'delivered' ? 'bg-accent-100 text-accent-800 hover:bg-accent-200' : 
                                  status === 'shipped' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                                  status === 'processing' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                                  status === 'pending' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                                  status === 'cancelled' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                                  'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                                }`
                            }
                          `}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-neutral-500 mb-3">Order Items</h4>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500">Product</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-neutral-500">Quantity</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-neutral-500">Price</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-neutral-500">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-neutral-800">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-neutral-600 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-neutral-600 text-right">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm font-medium text-neutral-800 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t border-neutral-200 bg-neutral-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-sm font-medium text-neutral-700 text-right">
                          Order Total:
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-neutral-800 text-right">
                          ${selectedOrder.total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagementPage;