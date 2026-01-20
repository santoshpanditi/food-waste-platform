import React, { useState } from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import type { FoodClaim } from '../contexts/FoodDataContext';
import '../styles/Pages.css';

export const AdminModeration: React.FC = () => {
  const { claims, updateClaim } = useFoodData();
  const [selectedClaim, setSelectedClaim] = useState<FoodClaim | null>(null);

  const pendingClaims = claims.filter(c => c.status === 'pending');

  const handleApproveClaim = (claimId: string) => {
    updateClaim(claimId, 'approved');
    alert('Claim approved!');
    setSelectedClaim(null);
  };

  const handleRejectClaim = (claimId: string) => {
    updateClaim(claimId, 'rejected');
    alert('Claim rejected!');
    setSelectedClaim(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Moderation & Claims Management</h1>
        <p>Review and approve pending food claims</p>
      </div>

      <div className="moderation-stats">
        <div className="stat-box">
          <strong>{pendingClaims.length}</strong>
          <p>Pending Claims</p>
        </div>
        <div className="stat-box">
          <strong>{claims.filter(c => c.status === 'approved').length}</strong>
          <p>Approved</p>
        </div>
        <div className="stat-box">
          <strong>{claims.filter(c => c.status === 'completed').length}</strong>
          <p>Completed</p>
        </div>
      </div>

      {pendingClaims.length === 0 ? (
        <div className="empty-state">
          <p>No pending claims to moderate</p>
        </div>
      ) : (
        <div className="claims-list">
          {pendingClaims.map(claim => (
            <div key={claim.id} className="claim-item-full">
              <div className="claim-header">
                <h3>Claim #{claim.id}</h3>
                <span className="status-badge status-pending">PENDING</span>
              </div>
              <div className="claim-details">
                <div className="detail-item">
                  <span className="label">Organization:</span>
                  <span className="value">{claim.recipientName}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Quantity Requested:</span>
                  <span className="value">{claim.quantity}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Claimed Date:</span>
                  <span className="value">{claim.claimedAt}</span>
                </div>
              </div>
              <button onClick={() => setSelectedClaim(claim)} className="btn-primary">
                Review Claim
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedClaim && (
        <div className="modal-overlay" onClick={() => setSelectedClaim(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedClaim(null)}>×</button>
            <h2>Review Claim</h2>
            <div className="modal-content">
              <p><strong>Organization:</strong> {selectedClaim.recipientName}</p>
              <p><strong>Quantity:</strong> {selectedClaim.quantity}</p>
              <p><strong>Claimed On:</strong> {selectedClaim.claimedAt}</p>
              {selectedClaim.message && (
                <p><strong>Message:</strong> {selectedClaim.message}</p>
              )}

              <div className="form-actions">
                <button 
                  onClick={() => handleApproveClaim(selectedClaim.id)}
                  className="btn-primary"
                >
                  ✓ Approve
                </button>
                <button 
                  onClick={() => handleRejectClaim(selectedClaim.id)}
                  className="btn-danger"
                >
                  ✗ Reject
                </button>
                <button onClick={() => setSelectedClaim(null)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
