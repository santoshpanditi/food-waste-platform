import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFoodData } from '../contexts/FoodDataContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Pages.css';

export const CreateListing: React.FC = () => {
  const { addListing } = useFoodData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: 0,
    unit: 'kg',
    category: 'Vegetables',
    expiryDate: '',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.quantity || !formData.expiryDate || !formData.location) {
      alert('Please fill all required fields');
      return;
    }

    addListing({
      ...formData,
      donorId: user?.id || '',
      donorName: user?.organizationName || user?.name || '',
      status: 'available'
    });

    alert('Food listing created successfully!');
    navigate('/donor/listings');
  };

  const categories = ['Vegetables', 'Bakery', 'Dairy', 'Fruits', 'Grains', 'Meat', 'Other'];
  const units = ['kg', 'items', 'liters', 'boxes', 'portions'];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>List Your Food Donation</h1>
        <p>Help reduce food waste by sharing surplus food</p>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Food Item Name *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Fresh Vegetables, Bakery Items"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the food, quality, and any allergens"
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              min="0"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label>Unit *</label>
            <select name="unit" value={formData.unit} onChange={handleChange}>
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Expiry Date *</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location/Pickup Point *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where can the food be picked up?"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">List Food</button>
          <button type="button" onClick={() => navigate('/donor/listings')} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};
