import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserList } from './UserList';
import { Sidebar } from './Sidebar';
import { useNavigate } from 'react-router-dom';

export const AdminPanel: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('users');
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    // No need to navigate here as the logout function will redirect to home
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
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
        
        <main className="p-6">
          {activeSection === 'users' && <UserList />}
          {/* Add other sections as needed */}
        </main>
      </div>
    </div>
  );
};

