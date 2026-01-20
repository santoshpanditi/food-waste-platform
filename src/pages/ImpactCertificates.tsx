import React, { useRef } from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Pages.css';

export const ImpactCertificates: React.FC = () => {
  const { listings, claims } = useFoodData();
  const { user } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);

  // Get donor's stats
  const donorListings = listings.filter(l => l.donorId === user?.id);
  const completedClaims = claims.filter(c => {
    const listing = listings.find(l => l.id === c.listingId);
    return listing?.donorId === user?.id && c.status === 'completed';
  });

  const totalFood = donorListings.reduce((sum, l) => sum + l.quantity, 0);
  const totalValue = completedClaims.length * 250; // Estimate ₹250 per claim
  const totalCO2Saved = (completedClaims.length * 2.5).toFixed(2);

  const generatePDF = () => {
    if (!certificateRef.current) return;

    // Create a simple PDF using the browser's print functionality
    const element = certificateRef.current;
    const newWindow = window.open('', '_blank');
    if (!newWindow) return;
    
    newWindow.document.write(element.innerHTML);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Impact Certificates</h1>
        <p>Generate printable impact reports and tax deduction documentation</p>
      </div>

      <div className="certificate-section">
        <div className="certificate-actions">
          <button className="btn btn-primary" onClick={generatePDF}>
            📥 Download Certificate (PDF)
          </button>
          <button className="btn btn-secondary" onClick={() => window.print()}>
            🖨️ Print Certificate
          </button>
        </div>

        <div ref={certificateRef} className="certificate-document">
          <div className="certificate-header">
            <div className="certificate-seal">🌱</div>
            <h1>Impact Certificate</h1>
            <p>Food Waste Reduction & Food Security Platform</p>
          </div>

          <div className="certificate-content">
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
              This certificate recognizes the significant contribution made by:
            </p>

            <div className="donor-info">
              <h2>{user?.name || 'Unknown Donor'}</h2>
              <p>{user?.organizationName || 'Individual Donor'}</p>
              <p style={{ fontSize: '12px', color: '#999' }}>
                Certificate Date: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="impact-achievement">
              <h3>🏆 Impact Achievement</h3>
              <p>
                Through your generous donations, you have contributed to reducing food waste and
                improving food security in our community. Your contributions have made a measurable
                difference in environmental sustainability and food security initiatives.
              </p>
            </div>

            <div className="stats-table">
              <table>
                <tbody>
                  <tr>
                    <td className="stat-name">Total Food Donated</td>
                    <td className="stat-value">{totalFood} kg</td>
                  </tr>
                  <tr>
                    <td className="stat-name">Successful Distributions</td>
                    <td className="stat-value">{completedClaims.length}</td>
                  </tr>
                  <tr>
                    <td className="stat-name">CO₂ Emissions Prevented</td>
                    <td className="stat-value">{totalCO2Saved} kg</td>
                  </tr>
                  <tr>
                    <td className="stat-name">Estimated Monetary Value</td>
                    <td className="stat-value">${totalValue.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="stat-name">Recipients Served</td>
                    <td className="stat-value">{new Set(completedClaims.map(c => c.recipientId)).size}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="tax-deduction-notice">
              <h4>Tax Deduction Information</h4>
              <p>
                The estimated monetary value of your donated food is ₹{totalValue.toLocaleString('en-IN')}.
                This certificate may be used for tax deduction purposes. Please consult with your
                tax advisor regarding the deductibility of your donations.
              </p>
              <p style={{ fontSize: '11px', color: '#999', marginTop: '8px' }}>
                This platform is not a registered 80G NGO. Please verify tax deduction
                eligibility with appropriate Indian tax authorities (IT Act, Section 80G).
              </p>
            </div>

            <div className="certificate-footer">
              <p>Thank you for your commitment to reducing food waste and improving food security in India!</p>
              <p className="platform-name">Bharat Food Waste Reduction & Food Security Platform</p>
            </div>
          </div>
        </div>

        {completedClaims.length > 0 && (
          <div className="claim-details" style={{ marginTop: '32px' }}>
            <h3>Completed Deliveries</h3>
            <div className="claims-list">
              {completedClaims.map(claim => {
                const listing = listings.find(l => l.id === claim.listingId);
                return (
                  <div key={claim.id} className="claim-item">
                    <div className="claim-info">
                      <strong>{listing?.title}</strong>
                      <p>{claim.quantity} {listing?.unit} → {claim.recipientName}</p>
                    </div>
                    <div className="claim-status">
                      <span className="badge badge-success">✓ Delivered</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .certificate-section {
          margin-top: 24px;
        }

        .certificate-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .certificate-document {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
          page-break-after: always;
        }

        .certificate-header {
          text-align: center;
          padding-bottom: 24px;
          border-bottom: 2px solid #667eea;
          margin-bottom: 24px;
        }

        .certificate-seal {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .certificate-header h1 {
          margin: 0 0 4px 0;
          color: #667eea;
          font-size: 32px;
        }

        .certificate-header p {
          margin: 0;
          color: #999;
          font-size: 14px;
        }

        .certificate-content {
          font-family: 'Georgia', serif;
          line-height: 1.8;
          color: #333;
        }

        .donor-info {
          text-align: center;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          margin: 20px 0;
        }

        .donor-info h2 {
          margin: 0 0 8px 0;
          color: #667eea;
          font-size: 24px;
        }

        .donor-info p {
          margin: 4px 0;
          color: #666;
        }

        .impact-achievement {
          margin: 20px 0;
          padding: 16px;
          background: #f0f4ff;
          border-left: 4px solid #667eea;
          border-radius: 4px;
        }

        .impact-achievement h3 {
          margin: 0 0 12px 0;
          color: #667eea;
        }

        .stats-table {
          width: 100%;
          margin: 24px 0;
        }

        .stats-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .stats-table tr {
          border-bottom: 1px solid #e0e0e0;
        }

        .stats-table td {
          padding: 12px;
          text-align: left;
        }

        .stat-name {
          font-weight: 600;
          color: #333;
          width: 60%;
        }

        .stat-value {
          color: #667eea;
          font-weight: 700;
          font-size: 16px;
        }

        .tax-deduction-notice {
          background: #fff9e6;
          border: 1px solid #ffd700;
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0;
          font-size: 12px;
        }

        .tax-deduction-notice h4 {
          margin: 0 0 8px 0;
          color: #b8860b;
        }

        .tax-deduction-notice p {
          margin: 4px 0;
          color: #666;
        }

        .certificate-footer {
          text-align: center;
          margin-top: 32px;
          padding-top: 20px;
          border-top: 2px solid #667eea;
        }

        .certificate-footer p {
          margin: 8px 0;
        }

        .platform-name {
          font-weight: 700;
          color: #667eea;
          font-size: 14px;
        }

        .claim-details {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .claims-list {
          display: grid;
          gap: 12px;
          margin-top: 12px;
        }

        .claim-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f9f9f9;
          border-radius: 6px;
        }

        .claim-info strong {
          display: block;
          color: #333;
          margin-bottom: 4px;
        }

        .claim-info p {
          margin: 0;
          font-size: 12px;
          color: #999;
        }

        .claim-status {
          display: flex;
          gap: 8px;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge-success {
          background: #d4edda;
          color: #155724;
        }

        @media print {
          .certificate-section {
            margin: 0;
          }

          .certificate-actions {
            display: none;
          }

          .certificate-document {
            box-shadow: none;
            max-width: 100%;
          }

          .claim-details {
            page-break-before: always;
          }
        }
      `}</style>
    </div>
  );
};
