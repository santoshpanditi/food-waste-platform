import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

interface LoginProps {
  isRegister?: boolean;
}

export const AuthPage: React.FC<LoginProps> = ({ isRegister = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'donor' | 'recipient' | 'analyst' | 'admin'>('donor');
  const [organizationName, setOrganizationName] = useState('');
  const [isReg, setIsReg] = useState(isRegister);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isReg) {
        await register({ email, password, name, role, organizationName });
      } else {
        await login(email, password, role);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Food Waste Reduction Platform</h1>
          <p>Reduce Food Waste, Improve Food Security in India</p>
          </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isReg ? 'Create Account' : 'Login'}</h2>

          {isReg && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Organization Name</label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Your organization"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as any)}>
              <option value="donor">Food Donor</option>
              <option value="recipient">Recipient Organization</option>
              <option value="analyst">Data Analyst</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            {isReg ? 'Create Account' : 'Login'}
          </button>

          <p className="auth-toggle">
            {isReg ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsReg(!isReg)}
              className="link-button"
            >
              {isReg ? 'Login' : 'Register'}
            </button>
          </p>
        </form>

        <div className="demo-credentials">
          <p>Demo Credentials (Indian Organizations):</p>
          <small>Donor: haryana@greenfarmsindian.com / 123456</small>
          <small>Recipient: delhi@foodbankindia.org / 123456</small>
          <small>Admin: admin@bharatsecure.gov / 123456</small>
          <small>Analyst: analyst@ngo-india.org / 123456</small>
        </div>
      </div>
    </div>
  );
};
