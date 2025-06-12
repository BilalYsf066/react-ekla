import React, { useState } from 'react';
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  Move
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productsCount: number;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Home Decor',
    slug: 'home-decor',
    description: 'Beautiful handcrafted items for your home',
    productsCount: 45
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Traditional and modern fashion items',
    productsCount: 32
  },
  {
    id: '3',
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Handmade jewelry and accessories',
    productsCount: 28
  },
  {
    id: '4',
    name: 'Art',
    slug: 'art',
    description: 'Original artwork and sculptures',
    productsCount: 19
  }
];

const AdminCategoriesPage: React.FC = () => {
  const [categories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement add category functionality
    setIsAddDialogOpen(false);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-semibold text-neutral-800">
          Product Categories
        </h1>
        
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-primary-600 hover:bg-primary-700"
        >
          <Plus size={18} className="mr-2" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <form onSubmit={handleSearch} className="relative max-w-md">
          <input
            type="text"
            placeholder="Search categories..."
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

      {/* Categories table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Move size={16} className="text-neutral-400 mr-2 cursor-move" />
                      <span className="text-sm font-medium text-neutral-800">
                        {category.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral-600">
                      {category.description}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                      {category.productsCount} products
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add category dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new product category.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddCategory}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Category
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit category dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update category information.
            </DialogDescription>
          </DialogHeader>
          {/* Add edit form here */}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCategory?.name}? This will also remove all product associations.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Implement delete functionality
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategoriesPage;