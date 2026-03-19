import React from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import '../styles/Pages.css';

export const AdminUsers: React.FC = () => {
  const { listings, claims } = useFoodData();

  // Extract unique donors and recipients
  const donors = new Set(listings.map(l => l.donorName));
  const recipients = new Set(claims.map(c => c.recipientName));

  const getUserStats = (name: string, type: 'donor' | 'recipient') => {
    if (type === 'donor') {
      const userListings = listings.filter(l => l.donorName === name);
      return {
        totalListings: userListings.length,
        totalFood: userListings.reduce((sum, l) => sum + l.quantity, 0),
        distributed: userListings.filter(l => l.status === 'distributed').length
      };
    } else {
      const userClaims = claims.filter(c => c.recipientName === name);
      return {
        totalClaims: userClaims.length,
        approved: userClaims.filter(c => c.status === 'approved').length,
        completed: userClaims.filter(c => c.status === 'completed').length
      };
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>User Management</h1>
        <p>Monitor and manage platform users</p>
      </div>

      <div className="admin-section">
        <h2>Food Donors ({donors.size})</h2>
        <table>
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Total Listings</th>
              <th>Total Food (kg)</th>
              <th>Distributed</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(donors).map(donor => {
              const stats = getUserStats(donor, 'donor');
              return (
                <tr key={donor}>
                  <td>{donor}</td>
                  <td>{stats.totalListings}</td>
                  <td>{stats.totalFood}</td>
                  <td>{stats.distributed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="admin-section">
        <h2>Recipient Organizations ({recipients.size})</h2>
        <table>
          <thead>
            <tr>
              <th>Organization Name</th>
              <th>Total Claims</th>
              <th>Approved</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(recipients).map(recipient => {
              const stats = getUserStats(recipient, 'recipient');
              return (
                <tr key={recipient}>
                  <td>{recipient}</td>
                  <td>{stats.totalClaims}</td>
                  <td>{stats.approved}</td>
                  <td>{stats.completed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
