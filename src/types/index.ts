export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'artisan' | 'admin';
  profileImage?: string;
}

export interface Artisan extends User {
  role: 'artisan';
  bio: string;
  location: string;
  specialties: string[];
  rating: number;
  joinedDate: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  artisanId: string;
  artisanName: string;
  createdAt: string;
  rating: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
  updatedAt: string;
}