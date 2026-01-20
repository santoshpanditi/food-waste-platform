import React from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../styles/Pages.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export const ImpactDashboard: React.FC = () => {
  const { metrics, claims } = useFoodData();

  const totalMetrics = metrics.reduce((acc, m) => ({
    wasteReduced: acc.wasteReduced + m.wasteReduced,
    foodDonated: acc.foodDonated + m.foodDonated,
    recipientsBenefited: acc.recipientsBenefited + m.recipientsBenefited,
    co2Saved: acc.co2Saved + m.co2Saved,
    mealsProvided: acc.mealsProvided + m.mealsProvided,
    monetaryValue: acc.monetaryValue + m.monetaryValue
  }), { wasteReduced: 0, foodDonated: 0, recipientsBenefited: 0, co2Saved: 0, mealsProvided: 0, monetaryValue: 0 });

  const claimStats = {
    pending: claims.filter(c => c.status === 'pending').length,
    approved: claims.filter(c => c.status === 'approved').length,
    completed: claims.filter(c => c.status === 'completed').length,
    rejected: claims.filter(c => c.status === 'rejected').length
  };

  const impactData = {
    labels: ['CO₂ Saved (kg)', 'Meals Provided', 'Recipients Helped'],
    datasets: [
      {
        label: 'Impact Metrics',
        data: [totalMetrics.co2Saved, totalMetrics.mealsProvided / 50, totalMetrics.recipientsBenefited],
        backgroundColor: ['#667eea', '#764ba2', '#f093fb'],
        borderRadius: 8
      }
    ]
  };

  const claimDistribution = {
    labels: ['Pending', 'Approved', 'Completed', 'Rejected'],
    datasets: [
      {
        data: [claimStats.pending, claimStats.approved, claimStats.completed, claimStats.rejected],
        backgroundColor: ['#FFA500', '#1E90FF', '#28A745', '#DC3545'],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🇮🇳 Impact Dashboard</h1>
        <p>Real-time metrics showing our collective impact on food waste reduction across India</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">♻️</div>
          <div className="stat-value" style={{ color: '#667eea' }}>
            {totalMetrics.co2Saved.toFixed(1)}
          </div>
          <div className="stat-label">CO₂ Saved</div>
          <div className="stat-unit">kg</div>
          <div className="stat-subtext">Environmental impact</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-value" style={{ color: '#764ba2' }}>
            {totalMetrics.mealsProvided}
          </div>
          <div className="stat-label">Meals Provided</div>
          <div className="stat-unit">servings</div>
          <div className="stat-subtext">Food distributed across India</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value" style={{ color: '#f093fb' }}>
            {totalMetrics.recipientsBenefited}
          </div>
          <div className="stat-label">People Helped</div>
          <div className="stat-unit">Indians served</div>
          <div className="stat-subtext">Community impact</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value" style={{ color: '#28A745' }}>
            ₹{totalMetrics.monetaryValue.toLocaleString('en-IN')}
          </div>
          <div className="stat-label">Donation Value</div>
          <div className="stat-unit">INR</div>
          <div className="stat-subtext">Market value of food</div>
        </div>
      </div>

      <div className="charts-section" style={{ marginTop: '32px' }}>
        <div className="chart-container">
          <h3>Impact Metrics</h3>
          <Bar
            data={impactData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>

        <div className="chart-container">
          <h3>Claim Distribution</h3>
          <Pie
            data={claimDistribution}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }}
          />
        </div>
      </div>

      <div className="impact-details" style={{ marginTop: '32px' }}>
        <h3>Detailed Breakdown</h3>
        <div className="details-grid">
          <div className="detail-item">
            <div className="detail-label">Total Food Donated</div>
            <div className="detail-value">{totalMetrics.foodDonated} kg</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Waste Reduced</div>
            <div className="detail-value">{totalMetrics.wasteReduced} kg</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Active Claims</div>
            <div className="detail-value">{claimStats.approved}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Completed Deliveries</div>
            <div className="detail-value">{claimStats.completed}</div>
          </div>
        </div>
      </div>

      <style>{`
        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
          margin: 24px 0;
        }

        .chart-container {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .chart-container h3 {
          margin: 0 0 16px 0;
          color: #333;
          font-size: 16px;
        }

        .impact-details {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .impact-details h3 {
          margin: 0 0 16px 0;
          color: #333;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .detail-item {
          padding: 16px;
          background: #f9f9f9;
          border-radius: 8px;
          text-align: center;
        }

        .detail-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 28px;
          font-weight: 700;
          color: #667eea;
        }
      `}</style>
    </div>
  );
};
