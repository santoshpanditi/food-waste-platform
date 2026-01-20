import React from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import '../styles/Pages.css';

export const AdminReports: React.FC = () => {
  const { listings, claims, metrics } = useFoodData();

  const totalFood = listings.reduce((sum, l) => sum + l.quantity, 0);
  const totalListings = listings.length;
  const availableListings = listings.filter(l => l.status === 'available').length;
  const distributedListings = listings.filter(l => l.status === 'distributed').length;
  const expiredListings = listings.filter(l => l.status === 'expired').length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>System Reports & Analytics</h1>
        <p>Overall platform statistics and performance</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Listings</h3>
            <p className="stat-value">{totalListings}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total Food Listed</h3>
            <p className="stat-value">{totalFood} kg</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Claims</h3>
            <p className="stat-value">{claims.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📉</div>
          <div className="stat-content">
            <h3>Waste Reduced</h3>
            <p className="stat-value">{metrics[0]?.wasteReduced || 0} kg</p>
          </div>
        </div>
      </div>

      <div className="reports-section">
        <h2>Listing Status Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Available</td>
              <td>{availableListings}</td>
              <td>{totalListings > 0 ? ((availableListings / totalListings) * 100).toFixed(1) : 0}%</td>
            </tr>
            <tr>
              <td>Distributed</td>
              <td>{distributedListings}</td>
              <td>{totalListings > 0 ? ((distributedListings / totalListings) * 100).toFixed(1) : 0}%</td>
            </tr>
            <tr>
              <td>Expired</td>
              <td>{expiredListings}</td>
              <td>{totalListings > 0 ? ((expiredListings / totalListings) * 100).toFixed(1) : 0}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="reports-section">
        <h2>Claim Status Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pending</td>
              <td>{claims.filter(c => c.status === 'pending').length}</td>
              <td>{claims.length > 0 ? ((claims.filter(c => c.status === 'pending').length / claims.length) * 100).toFixed(1) : 0}%</td>
            </tr>
            <tr>
              <td>Approved</td>
              <td>{claims.filter(c => c.status === 'approved').length}</td>
              <td>{claims.length > 0 ? ((claims.filter(c => c.status === 'approved').length / claims.length) * 100).toFixed(1) : 0}%</td>
            </tr>
            <tr>
              <td>Completed</td>
              <td>{claims.filter(c => c.status === 'completed').length}</td>
              <td>{claims.length > 0 ? ((claims.filter(c => c.status === 'completed').length / claims.length) * 100).toFixed(1) : 0}%</td>
            </tr>
            <tr>
              <td>Rejected</td>
              <td>{claims.filter(c => c.status === 'rejected').length}</td>
              <td>{claims.length > 0 ? ((claims.filter(c => c.status === 'rejected').length / claims.length) * 100).toFixed(1) : 0}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
