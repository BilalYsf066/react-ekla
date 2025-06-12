import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Plus, Search, Edit, Trash2, AlertCircle, Eye, ArrowDown, ArrowUp } from 'lucide-react';
import { Product } from '../../types';
import { mockProducts } from '../../data/mockData';

const ProductManagementPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call to fetch the artisan's products
    // For this demo, we'll filter mock products by artisanId
    const filteredProducts = mockProducts.filter(p => p.artisanId === user?.id);
    setProducts(filteredProducts);
  }, [user]);

  // Redirect if not authenticated or not an artisan
  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (!isLoading && (!isAuthenticated || user?.role !== 'artisan')) {
    return <Navigate to="/login" />;
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products]
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = a[sortField as keyof Product];
      const fieldB = b[sortField as keyof Product];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' 
          ? fieldA - fieldB 
          : fieldB - fieldA;
      }
      
      return 0;
    });

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      // In a real app, this would be an API call to delete the product
      setProducts(products.filter(p => p.id !== productToDelete.id));
    }
    
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-semibold text-neutral-800 mb-2">
            Products
          </h1>
          <p className="text-neutral-600">
            Manage your product inventory and listings
          </p>
        </div>
        
        <Link
          to="/dashboard/products/new"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add New Product
        </Link>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" 
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="px-3 py-2 border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="home">Home Decor</option>
              <option value="fashion">Fashion</option>
              <option value="jewelry">Jewelry</option>
              <option value="art">Art</option>
            </select>
            
            <select
              className="px-3 py-2 border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Inventory</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Products table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('name')}
                  >
                    Product
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('category')}
                  >
                    Category
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('price')}
                  >
                    Price
                    {sortField === 'price' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('stock')}
                  >
                    Stock
                    {sortField === 'stock' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-800">
                            {product.name}
                          </div>
                          <div className="text-xs text-neutral-500 truncate max-w-xs">
                            {product.description.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-700">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-700">
                        ${product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.stock > 10 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                          In Stock ({product.stock})
                        </span>
                      ) : product.stock > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Low Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/products/${product.id}`}
                          className="text-neutral-500 hover:text-neutral-700"
                          title="View Product"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`/dashboard/products/edit/${product.id}`}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit Product"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => openDeleteModal(product)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <AlertCircle size={48} className="text-neutral-400 mb-4" />
                      <h3 className="text-lg font-medium text-neutral-700 mb-1">
                        {searchQuery ? 'No products found' : 'No products yet'}
                      </h3>
                      <p className="text-neutral-500 mb-4">
                        {searchQuery 
                          ? 'Try adjusting your search or filters'
                          : 'Add your first product to start selling'
                        }
                      </p>
                      {!searchQuery && (
                        <Link
                          to="/dashboard/products/new"
                          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                        >
                          <Plus size={18} className="mr-2" />
                          Add New Product
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-neutral-800 mb-2">
              Delete Product
            </h3>
            
            <p className="text-neutral-600 mb-4">
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagementPage;