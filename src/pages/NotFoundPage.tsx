import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-display font-bold text-primary-600 mb-4">404</h1>
        
        <h2 className="text-2xl font-medium text-neutral-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-neutral-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft size={16} className="mr-2" /> 
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;