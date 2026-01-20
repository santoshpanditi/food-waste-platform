import React, { useState } from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import type { FoodListing } from '../contexts/FoodDataContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Pages.css';

export const DonorListings: React.FC = () => {
  const { listings, updateListing, deleteListing } = useFoodData();
  const { user } = useAuth();
  const [selectedListing, setSelectedListing] = useState<FoodListing | null>(null);
  const [editStatus, setEditStatus] = useState<FoodListing['status'] | null>(null);

  const myListings = listings.filter(l => l.donorId === user?.id || l.donorName === user?.organizationName);

  const handleStatusChange = (listingId: string, newStatus: FoodListing['status']) => {
    updateListing(listingId, { status: newStatus });
    setEditStatus(null);
  };

  const handleDelete = (listingId: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      deleteListing(listingId);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Food Listings</h1>
        <p>Manage your food donations and track their impact</p>
      </div>

      {myListings.length === 0 ? (
        <div className="empty-state">
          <p>No listings yet. Create your first donation!</p>
        </div>
      ) : (
        <div className="listings-table">
          <table>
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Claims</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myListings.map(listing => (
                <tr key={listing.id}>
                  <td>{listing.title}</td>
                  <td>{listing.quantity} {listing.unit}</td>
                  <td>{listing.expiryDate}</td>
                  <td>{listing.location}</td>
                  <td>
                    <span className={`status-badge status-${listing.status}`}>
                      {listing.status}
                    </span>
                  </td>
                  <td>{listing.claims?.length || 0}</td>
                  <td>
                    <button onClick={() => setSelectedListing(listing)} className="btn-small">
                      View
                    </button>
                    <button onClick={() => handleDelete(listing.id)} className="btn-small btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedListing && (
        <div className="modal-overlay" onClick={() => setSelectedListing(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedListing(null)}>×</button>
            <h2>{selectedListing.title}</h2>
            <div className="modal-content">
              <p><strong>Description:</strong> {selectedListing.description}</p>
              <p><strong>Quantity:</strong> {selectedListing.quantity} {selectedListing.unit}</p>
              <p><strong>Category:</strong> {selectedListing.category}</p>
              <p><strong>Expiry Date:</strong> {selectedListing.expiryDate}</p>
              <p><strong>Location:</strong> {selectedListing.location}</p>
              <p><strong>Status:</strong> {selectedListing.status}</p>
              
              {selectedListing.claims && selectedListing.claims.length > 0 && (
                <div className="claims-section">
                  <h3>Claims ({selectedListing.claims.length})</h3>
                  {selectedListing.claims.map(claim => (
                    <div key={claim.id} className="claim-item">
                      <p><strong>{claim.recipientName}</strong> - {claim.quantity} {selectedListing.unit}</p>
                      <p>Status: <span className={`status-badge status-${claim.status}`}>{claim.status}</span></p>
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-actions">
                <label>Change Status:</label>
                <select 
                  value={editStatus || selectedListing.status}
                  onChange={(e) => handleStatusChange(selectedListing.id, e.target.value as any)}
                >
                  <option value="available">Available</option>
                  <option value="claimed">Claimed</option>
                  <option value="distributed">Distributed</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
