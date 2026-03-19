import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFoodData } from '../contexts/FoodDataContext';
import '../styles/Dashboard.css';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { listings, claims, metrics } = useFoodData();

  const totalFoodAvailable = listings.reduce((sum, l) => sum + (l.status === 'available' ? l.quantity : 0), 0);
  const totalClaims = claims.length;
  const completedClaims = claims.filter(c => c.status === 'completed').length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <p>Role: <strong>{user?.role?.toUpperCase()}</strong> </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🍎</div>
          <div className="stat-content">
            <h3>Food Available</h3>
            <p className="stat-value">{totalFoodAvailable} kg</p>
            <small>{listings.filter(l => l.status === 'available').length} listings</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Active Claims</h3>
            <p className="stat-value">{totalClaims}</p>
            <small>{claims.filter(c => c.status === 'pending').length} pending</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed Distributions</h3>
            <p className="stat-value">{completedClaims}</p>
            <small>Total successful claims</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Waste Reduced Today</h3>
            <p className="stat-value">{metrics[0]?.wasteReduced || 0} kg</p>
            <small>Platform impact</small>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {user?.role === 'donor' && <DonorDashboard />}
        {user?.role === 'recipient' && <RecipientDashboard />}
        {user?.role === 'analyst' && <AnalystDashboard />}
        {user?.role === 'admin' && <AdminDashboard />}
      </div>
    </div>
  );
};

const DonorDashboard: React.FC = () => {
  const { listings } = useFoodData();
  const myListings = listings;

  return (
    <div className="role-dashboard">
      <h2>Your Listings</h2>
      <div className="listings-summary">
        <div className="summary-item">
          <span>Active Listings:</span>
          <strong>{myListings.filter(l => l.status === 'available').length}</strong>
        </div>
        <div className="summary-item">
          <span>Total Food Donated:</span>
          <strong>{myListings.reduce((sum, l) => sum + (l.status === 'distributed' ? l.quantity : 0), 0)} kg</strong>
        </div>
      </div>
    </div>
  );
};

const RecipientDashboard: React.FC = () => {
  const { claims } = useFoodData();

  return (
    <div className="role-dashboard">
      <h2>Your Claims</h2>
      <div className="listings-summary">
        <div className="summary-item">
          <span>Total Claims:</span>
          <strong>{claims.length}</strong>
        </div>
        <div className="summary-item">
          <span>Approved Claims:</span>
          <strong>{claims.filter(c => c.status === 'approved').length}</strong>
        </div>
        <div className="summary-item">
          <span>Completed:</span>
          <strong>{claims.filter(c => c.status === 'completed').length}</strong>
        </div>
      </div>
    </div>
  );
};

const AnalystDashboard: React.FC = () => {
  const { metrics } = useFoodData();

  return (
    <div className="role-dashboard">
      <h2>Analytics Overview</h2>
      <div className="listings-summary">
        <div className="summary-item">
          <span>Food Waste Reduced:</span>
          <strong>{metrics[0]?.wasteReduced || 0} kg</strong>
        </div>
        <div className="summary-item">
          <span>Food Donated:</span>
          <strong>{metrics[0]?.foodDonated || 0} kg</strong>
        </div>
        <div className="summary-item">
          <span>People Benefited:</span>
          <strong>{metrics[0]?.recipientsBenefited || 0}</strong>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { listings, claims } = useFoodData();

  return (
    <div className="role-dashboard">
      <h2>Platform Overview</h2>
      <div className="listings-summary">
        <div className="summary-item">
          <span>Total Listings:</span>
          <strong>{listings.length}</strong>
        </div>
        <div className="summary-item">
          <span>Total Claims:</span>
          <strong>{claims.length}</strong>
        </div>
        <div className="summary-item">
          <span>Pending Moderation:</span>
          <strong>{claims.filter(c => c.status === 'pending').length}</strong>
        </div>
      </div>
    </div>
  );
};
