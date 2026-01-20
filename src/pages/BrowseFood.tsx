import React, { useState } from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import type { FoodListing } from '../contexts/FoodDataContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Pages.css';

export const BrowseFood: React.FC = () => {
  const { listings, claimFood } = useFoodData();
  const { user } = useAuth();
  const [selectedListing, setSelectedListing] = useState<FoodListing | null>(null);
  const [claimQuantity, setClaimQuantity] = useState<number>(0);
  const [claimMessage, setClaimMessage] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const availableListings = listings.filter(l => l.status === 'available');
  const categories = ['All', ...new Set(listings.map(l => l.category))];

  const filteredListings = filterCategory === 'All' 
    ? availableListings 
    : availableListings.filter(l => l.category === filterCategory);

  const handleClaimFood = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedListing || claimQuantity <= 0 || claimQuantity > selectedListing.quantity) {
      alert('Please enter a valid quantity');
      return;
    }

    claimFood(
      selectedListing.id,
      claimQuantity,
      user?.id || '',
      user?.organizationName || user?.name || ''
    );

    alert('Food claim submitted! Awaiting donor approval.');
    setSelectedListing(null);
    setClaimQuantity(0);
    setClaimMessage('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Browse Available Food</h1>
        <p>Find food donations from our community donors</p>
      </div>

      <div className="filter-section">
        <label>Filter by Category:</label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {filteredListings.length === 0 ? (
        <div className="empty-state">
          <p>No food listings available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="listings-grid">
          {filteredListings.map(listing => (
            <div key={listing.id} className="listing-card">
              <div className="card-header">
                <h3>{listing.title}</h3>
                <span className="category-badge">{listing.category}</span>
              </div>
              <div className="card-body">
                <p className="description">{listing.description}</p>
                <div className="listing-details">
                  <div className="detail-item">
                    <span className="label">Quantity:</span>
                    <span className="value">{listing.quantity} {listing.unit}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Expires:</span>
                    <span className="value">{listing.expiryDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Location:</span>
                    <span className="value">{listing.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Donor:</span>
                    <span className="value">{listing.donorName}</span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button onClick={() => setSelectedListing(listing)} className="btn-primary">
                  Claim Food
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedListing && (
        <div className="modal-overlay" onClick={() => setSelectedListing(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedListing(null)}>×</button>
            <h2>Claim Food: {selectedListing.title}</h2>
            <form onSubmit={handleClaimFood}>
              <div className="form-group">
                <label>Quantity to Claim *</label>
                <input
                  type="number"
                  value={claimQuantity}
                  onChange={(e) => setClaimQuantity(parseFloat(e.target.value))}
                  max={selectedListing.quantity}
                  min="0"
                  step="0.1"
                  placeholder="Enter quantity"
                  required
                />
                <small>Available: {selectedListing.quantity} {selectedListing.unit}</small>
              </div>

              <div className="form-group">
                <label>Message (optional)</label>
                <textarea
                  value={claimMessage}
                  onChange={(e) => setClaimMessage(e.target.value)}
                  placeholder="Leave a message for the donor"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <p><strong>Your Organization:</strong> {selectedListing.donorName}</p>
                <p><strong>Pickup Location:</strong> {selectedListing.location}</p>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">Submit Claim</button>
                <button type="button" onClick={() => setSelectedListing(null)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
