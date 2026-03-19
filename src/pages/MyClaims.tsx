import React, { useState } from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import type { FoodClaim } from '../contexts/FoodDataContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Pages.css';

export const MyClaims: React.FC = () => {
  const { claims, updateClaim, listings } = useFoodData();
  const { user } = useAuth();
  const [selectedClaim, setSelectedClaim] = useState<FoodClaim | null>(null);
  const [filterStatus, setFilterStatus] = useState<FoodClaim['status'] | 'All'>('All');

  const myClaims = claims.filter(c => c.recipientId === user?.id || c.recipientName === user?.organizationName);

  const filteredClaims = filterStatus === 'All'
    ? myClaims
    : myClaims.filter(c => c.status === filterStatus);

  const getListingInfo = (listingId: string) => {
    return listings.find(l => l.id === listingId);
  };

  const handleStatusUpdate = (claimId: string, newStatus: FoodClaim['status']) => {
    updateClaim(claimId, newStatus);
    setSelectedClaim(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Food Claims</h1>
        <p>Track the status of your food claims and donations received</p>
      </div>

      <div className="filter-section">
        <label>Filter by Status:</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
          <option value="All">All Claims</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredClaims.length === 0 ? (
        <div className="empty-state">
          <p>No claims found. Start browsing food listings!</p>
        </div>
      ) : (
        <div className="claims-list">
          {filteredClaims.map(claim => {
            const listing = getListingInfo(claim.listingId);
            return (
              <div key={claim.id} className="claim-item-full">
                <div className="claim-header">
                  <h3>{listing?.title}</h3>
                  <span className={`status-badge status-${claim.status}`}>
                    {claim.status.toUpperCase()}
                  </span>
                </div>
                <div className="claim-details">
                  <div className="detail-item">
                    <span className="label">Quantity Claimed:</span>
                    <span className="value">{claim.quantity} {listing?.unit}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Food Category:</span>
                    <span className="value">{listing?.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Donor:</span>
                    <span className="value">{listing?.donorName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Claimed Date:</span>
                    <span className="value">{claim.claimedAt}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Pickup Location:</span>
                    <span className="value">{listing?.location}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedClaim(claim)} className="btn-small">
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedClaim && (
        <div className="modal-overlay" onClick={() => setSelectedClaim(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedClaim(null)}>×</button>
            <h2>Claim Details</h2>
            <div className="modal-content">
              <p><strong>Status:</strong> <span className={`status-badge status-${selectedClaim.status}`}>{selectedClaim.status}</span></p>
              <p><strong>Quantity:</strong> {selectedClaim.quantity}</p>
              <p><strong>Claimed on:</strong> {selectedClaim.claimedAt}</p>
              
              {selectedClaim.message && (
                <p><strong>Your Message:</strong> {selectedClaim.message}</p>
              )}

              <div className="form-actions">
                {selectedClaim.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusUpdate(selectedClaim.id, 'completed')}
                      className="btn-primary"
                    >
                      Mark as Completed
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(selectedClaim.id, 'rejected')}
                      className="btn-danger"
                    >
                      Cancel Claim
                    </button>
                  </>
                )}
                <button onClick={() => setSelectedClaim(null)} className="btn-secondary">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
