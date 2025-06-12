import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RegisterArtisanPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { registerArtisan } = useAuth();
  const navigate = useNavigate();

  const addSpecialty = () => {
    if (specialty.trim() && !specialties.includes(specialty.trim())) {
      setSpecialties([...specialties, specialty.trim()]);
      setSpecialty('');
    }
  };

  const removeSpecialty = (index: number) => {
    setSpecialties(specialties.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !confirmPassword || !bio || !location || specialties.length === 0) {
      setError('Please fill in all fields and add at least one specialty.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      await registerArtisan({
        name,
        email,
        password,
        bio,
        location,
        specialties,
      });
      navigate('/dashboard');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-display font-semibold text-neutral-800 mb-2 text-center">
            Join as an Artisan
          </h1>
          
          <p className="text-neutral-600 text-center mb-6">
            Showcase and sell your handcrafted products to customers worldwide
          </p>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name / Business Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your name or business name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="City, Country"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="specialties" className="block text-sm font-medium text-neutral-700 mb-1">
                  Specialties
                </label>
                <div className="flex">
                  <input
                    id="specialties"
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Jewelry, Textiles, Pottery"
                  />
                  <button
                    type="button"
                    onClick={addSpecialty}
                    className="px-3 py-2 bg-secondary-600 text-white rounded-r-md hover:bg-secondary-700 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                {specialties.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {specialties.map((s, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(index)}
                          className="ml-1 text-secondary-600 hover:text-secondary-800"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 mb-1">
                Bio / About Your Work
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell customers about yourself and your craft..."
                required
              ></textarea>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 border-neutral-300 rounded text-primary-600 focus:ring-primary-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
                  I agree to the <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Service</a>, <a href="#" className="text-primary-600 hover:text-primary-700">Artisan Agreement</a>, and <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-md font-medium text-white ${
                isLoading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
              } transition-colors`}
            >
              {isLoading ? 'Creating Account...' : 'Create Artisan Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Looking to shop?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Register as a Customer
              </Link>
            </p>
          </div>
          
          <div className="mt-2 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterArtisanPage;