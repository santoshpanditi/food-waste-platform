import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navigation.css';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>�🇳 BharatSecure - Food Waste Reduction</span>
        </div>

        <div className="navbar-menu">
          <button onClick={() => navigate('/dashboard')} className="nav-link">
            Dashboard
          </button>

          {/* Shared Logistics & Impact */}
          <button onClick={() => navigate('/impact/dashboard')} className="nav-link">
            🌍 Impact
          </button>
          <button onClick={() => navigate('/delivery/tracking')} className="nav-link">
            📦 Deliveries
          </button>

          {user?.role === 'donor' && (
            <>
              <button onClick={() => navigate('/donor/listings')} className="nav-link">
                My Listings
              </button>
              <button onClick={() => navigate('/donor/create')} className="nav-link">
                List Food
              </button>
              <button onClick={() => navigate('/donor/certificates')} className="nav-link">
                📄 Certificates
              </button>
            </>
          )}

          {user?.role === 'recipient' && (
            <>
              <button onClick={() => navigate('/recipient/browse')} className="nav-link">
                Browse Food
              </button>
              <button onClick={() => navigate('/recipient/claims')} className="nav-link">
                My Claims
              </button>
            </>
          )}

          {user?.role === 'analyst' && (
            <>
              <button onClick={() => navigate('/analyst/reports')} className="nav-link">
                Reports
              </button>
              <button onClick={() => navigate('/analyst/trends')} className="nav-link">
                Trends
              </button>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <button onClick={() => navigate('/admin/users')} className="nav-link">
                Users
              </button>
              <button onClick={() => navigate('/admin/moderation')} className="nav-link">
                Moderation
              </button>
              <button onClick={() => navigate('/admin/reports')} className="nav-link">
                System Reports
              </button>
            </>
          )}
        </div>

        <div className="navbar-user">
          <span className="user-info">
            {user?.name} ({user?.role?.toUpperCase()})
          </span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
