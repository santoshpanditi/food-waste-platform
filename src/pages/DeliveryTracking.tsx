import React, { useState } from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Pages.css';

export const DeliveryTracking: React.FC = () => {
  const { claims, deliveries, listings, updateDelivery } = useFoodData();
  const { user } = useAuth();
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

  // Get deliveries for user's role
  const userDeliveries = deliveries.filter(d => {
    const claim = claims.find(c => c.id === d.claimId);
    if (!claim) return false;
    const listing = listings.find(l => l.id === claim.listingId);

    if (user?.role === 'donor') {
      return listing?.donorId === user.id || listing?.donorName === user.organizationName;
    }

    if (user?.role === 'recipient') {
      return claim.recipientId === user.id || claim.recipientName === user.organizationName;
    }

    return true;
  });

  const handleStatusUpdate = (deliveryId: string, newStatus: typeof deliveries[0]['status']) => {
    const updates: any = { status: newStatus };
    if (newStatus === 'delivered') {
      updates.deliveryTime = new Date().toISOString();
    }
    updateDelivery(deliveryId, updates);
  };

  const getClaimInfo = (claimId: string) => claims.find(c => c.id === claimId);
  const getListingInfo = (listingId: string) => listings.find(l => l.id === listingId);

  const statusColors: Record<string, string> = {
    'scheduled': '#FFA500',
    'in-transit': '#1E90FF',
    'delivered': '#28A745',
    'failed': '#DC3545'
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Delivery Tracking</h1>
        <p>Monitor and manage food deliveries in real-time</p>
      </div>

      {userDeliveries.length === 0 ? (
        <div className="empty-state">
          <p>No deliveries yet</p>
        </div>
      ) : (
        <div className="deliveries-grid">
          {userDeliveries.map(delivery => {
            const claim = getClaimInfo(delivery.claimId);
            const listing = claim ? getListingInfo(claim.listingId) : null;

            return (
              <div
                key={delivery.id}
                className="delivery-card"
                style={{
                  border: selectedDelivery === delivery.id ? '2px solid #667eea' : '1px solid #e0e0e0',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedDelivery(selectedDelivery === delivery.id ? null : delivery.id)}
              >
                <div className="delivery-header">
                  <h3>{listing?.title || 'Unknown Item'}</h3>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: statusColors[delivery.status] }}
                  >
                    {delivery.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="delivery-details">
                  <div className="detail-row">
                    <span className="label">Recipient:</span>
                    <span>{claim?.recipientName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Quantity:</span>
                    <span>{claim?.quantity} {listing?.unit}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Distance:</span>
                    <span>{delivery.distance.toFixed(2)} km</span>
                  </div>
                  {delivery.pickupTime && (
                    <div className="detail-row">
                      <span className="label">Pickup:</span>
                      <span>{new Date(delivery.pickupTime).toLocaleDateString()}</span>
                    </div>
                  )}
                  {delivery.deliveryTime && (
                    <div className="detail-row">
                      <span className="label">Delivered:</span>
                      <span>{new Date(delivery.deliveryTime).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {selectedDelivery === delivery.id && (
                  <div className="delivery-actions">
                    <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: statusColors[delivery.status],
                        opacity: delivery.status === 'scheduled' ? 1 : 0.6,
                        cursor: delivery.status === 'scheduled' ? 'pointer' : 'not-allowed'
                      }}
                      onClick={() => delivery.status === 'scheduled' && handleStatusUpdate(delivery.id, 'in-transit')}
                      disabled={delivery.status !== 'scheduled'}
                    >
                      Mark In-Transit
                    </button>
                    <button
                      className="btn btn-success"
                      style={{
                        backgroundColor: '#28A745',
                        opacity: delivery.status === 'in-transit' ? 1 : 0.6,
                        cursor: delivery.status === 'in-transit' ? 'pointer' : 'not-allowed'
                      }}
                      onClick={() => delivery.status === 'in-transit' && handleStatusUpdate(delivery.id, 'delivered')}
                      disabled={delivery.status !== 'in-transit'}
                    >
                      Mark Delivered
                    </button>
                    {delivery.proofPhotos.length > 0 && (
                      <div className="proof-photos" style={{ marginTop: '12px' }}>
                        <p style={{ fontSize: '12px', marginBottom: '8px' }}>
                          Proof Photos: {delivery.proofPhotos.length}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .deliveries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
          margin-top: 24px;
        }

        .delivery-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .delivery-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .delivery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          gap: 12px;
        }

        .delivery-header h3 {
          margin: 0;
          color: #333;
          font-size: 16px;
          flex: 1;
        }

        .delivery-details {
          background: #f9f9f9;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          font-size: 13px;
        }

        .detail-row .label {
          font-weight: 600;
          color: #666;
        }

        .delivery-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .delivery-actions button {
          flex: 1;
          min-width: 120px;
          padding: 8px 12px;
          font-size: 12px;
        }

        .btn-success {
          background-color: #28A745 !important;
        }
      `}</style>
    </div>
  );
};
