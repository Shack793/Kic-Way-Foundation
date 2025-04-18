import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    // The logout function in AuthContext already redirects to home
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">User Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Address</p>
              <p className="font-medium">{user?.address}</p>
            </div>
            
            <div>
              <p className="text-gray-600">City</p>
              <p className="font-medium">{user?.city}</p>
            </div>
            
            <div>
              <p className="text-gray-600">State</p>
              <p className="font-medium">{user?.state}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Zip Code</p>
              <p className="font-medium">{user?.zip_code}</p>
            </div>
            
            <div>
              <p className="text-gray-600">Telephone</p>
              <p className="font-medium">{user?.telephone}</p>
            </div>
            
            {user?.website && (
              <div>
                <p className="text-gray-600">Website</p>
                <p className="font-medium">
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {user.website}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};