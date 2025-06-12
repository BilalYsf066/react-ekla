import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerClient: (name: string, email: string, password: string) => Promise<void>;
  registerArtisan: (data: { name: string; email: string; password: string; bio: string; location: string; specialties: string[] }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Mock authentication for demo purposes
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'client',
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerClient = async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Mock registration
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'client',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerArtisan = async (data: { name: string; email: string; password: string; bio: string; location: string; specialties: string[] }) => {
    setIsLoading(true);
    try {
      // Mock registration
      const mockUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: 'artisan',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        registerClient, 
        registerArtisan, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};