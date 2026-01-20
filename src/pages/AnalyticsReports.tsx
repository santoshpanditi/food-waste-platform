import React from 'react';
import { useFoodData } from '../contexts/FoodDataContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../styles/Pages.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const AnalyticsReports: React.FC = () => {
  const { metrics, listings, claims } = useFoodData();
  const currentMetric = metrics[0];

  // Prepare data for waste by category chart
  const wasteByCategory = {
    labels: currentMetric?.categoriesWaste.map(c => c.category) || [],
    datasets: [{
      label: 'Food Waste Reduced (kg)',
      data: currentMetric?.categoriesWaste.map(c => c.amount) || [],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(244, 67, 54, 0.8)',
        'rgba(156, 39, 176, 0.8)'
      ]
    }]
  };

  // Prepare data for distribution status
  const claimStatuses = {
    pending: claims.filter(c => c.status === 'pending').length,
    approved: claims.filter(c => c.status === 'approved').length,
    completed: claims.filter(c => c.status === 'completed').length,
    rejected: claims.filter(c => c.status === 'rejected').length
  };

  const claimStatusChart = {
    labels: ['Pending', 'Approved', 'Completed', 'Rejected'],
    datasets: [{
      data: [claimStatuses.pending, claimStatuses.approved, claimStatuses.completed, claimStatuses.rejected],
      backgroundColor: [
        'rgba(255, 193, 7, 0.8)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(33, 150, 243, 0.8)',
        'rgba(244, 67, 54, 0.8)'
      ]
    }]
  };

  const totalWasteReduced = currentMetric?.wasteReduced || 0;
  const totalFoodDonated = currentMetric?.foodDonated || 0;
  const avgFoodPerListing = listings.length > 0 
    ? (totalFoodDonated / listings.length).toFixed(2)
    : 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Analytics & Reports</h1>
        <p>Track food waste reduction and distribution metrics</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📉</div>
          <div className="stat-content">
            <h3>Waste Reduced</h3>
            <p className="stat-value">{totalWasteReduced} kg</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Food Donated</h3>
            <p className="stat-value">{totalFoodDonated} kg</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>People Benefited</h3>
            <p className="stat-value">{currentMetric?.recipientsBenefited || 0}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Avg per Listing</h3>
            <p className="stat-value">{avgFoodPerListing} kg</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Food Waste by Category</h3>
          <Bar data={wasteByCategory} options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }} />
        </div>

        <div className="chart-container">
          <h3>Claim Distribution Status</h3>
          <Pie data={claimStatusChart} options={{
            responsive: true,
            maintainAspectRatio: true
          }} />
        </div>
      </div>

      <div className="detailed-metrics">
        <h3>Detailed Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Active Listings</td>
              <td>{listings.filter(l => l.status === 'available').length}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Total Food Claims</td>
              <td>{claims.length}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Completed Claims</td>
              <td>{claims.filter(c => c.status === 'completed').length}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Pending Claims</td>
              <td>{claims.filter(c => c.status === 'pending').length}</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
