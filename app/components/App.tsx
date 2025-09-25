import { useState } from 'react';
import { Dashboard } from './Dashborad';
import { GuaranteesList } from './GuaranteesList';
import { CarBlogs } from './CarBlogs';

type ViewType = 'dashboard' | 'guarantees' | 'upload' | 'reminders' | 'car-blogs' | 'contact';

export const App = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Digital Guarantee Locker</h1>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  switch (currentView) {
    case 'guarantees':
      return <GuaranteesList onBack={handleBackToDashboard} />;
    case 'car-blogs':
      return <CarBlogs onBack={handleBackToDashboard} />;
    case 'upload':
    case 'reminders':
    case 'contact':
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Page
            </h2>
            <p className="text-gray-600 mb-4">This page is under development</p>
            <button
              onClick={handleBackToDashboard}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
    default:
      return (
        <Dashboard
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      );
  }
};