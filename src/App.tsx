import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FoodDataProvider } from './contexts/FoodDataContext';
import { AuthPage } from './components/AuthPage';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { DonorListings } from './pages/DonorListings';
import { CreateListing } from './pages/CreateListing';
import { BrowseFood } from './pages/BrowseFood';
import { MyClaims } from './pages/MyClaims';
import { AnalyticsReports } from './pages/AnalyticsReports';
import { AdminUsers } from './pages/AdminUsers';
import { AdminModeration } from './pages/AdminModeration';
import { AdminReports } from './pages/AdminReports';
import { DeliveryTracking } from './pages/DeliveryTracking';
import { ImpactDashboard } from './pages/ImpactDashboard';
import { ImpactCertificates } from './pages/ImpactCertificates';
import './styles/Global.css';
import './App.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Donor Routes */}
        <Route
          path="/donor/listings"
          element={
            <ProtectedRoute>
              {user?.role === 'donor' ? <DonorListings /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/create"
          element={
            <ProtectedRoute>
              {user?.role === 'donor' ? <CreateListing /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />

        {/* Recipient Routes */}
        <Route
          path="/recipient/browse"
          element={
            <ProtectedRoute>
              {user?.role === 'recipient' ? <BrowseFood /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipient/claims"
          element={
            <ProtectedRoute>
              {user?.role === 'recipient' ? <MyClaims /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />

        {/* Analyst Routes */}
        <Route
          path="/analyst/reports"
          element={
            <ProtectedRoute>
              {user?.role === 'analyst' ? <AnalyticsReports /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              {user?.role === 'admin' ? <AdminUsers /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/moderation"
          element={
            <ProtectedRoute>
              {user?.role === 'admin' ? <AdminModeration /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              {user?.role === 'admin' ? <AdminReports /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />

        {/* Logistics & Impact Routes */}
        <Route
          path="/delivery/tracking"
          element={
            <ProtectedRoute>
              <DeliveryTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/impact/dashboard"
          element={
            <ProtectedRoute>
              <ImpactDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/certificates"
          element={
            <ProtectedRoute>
              {user?.role === 'donor' ? <ImpactCertificates /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FoodDataProvider>
          <AppContent />
        </FoodDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
