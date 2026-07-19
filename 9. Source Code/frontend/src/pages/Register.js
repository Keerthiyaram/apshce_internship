import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Utensils } from 'lucide-react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    goal: '',
    dietaryRestrictions: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDietaryChange = (restriction) => {
    const updated = formData.dietaryRestrictions.includes(restriction)
      ? formData.dietaryRestrictions.filter(r => r !== restriction)
      : [...formData.dietaryRestrictions, restriction];
    setFormData({ ...formData, dietaryRestrictions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <Utensils size={48} className="auth-icon" />
          <h1>Create Account</h1>
          <p>Start your nutrition journey today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input"
                placeholder="Age"
              />
            </div>
            
            <div className="form-group">
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="input"
                placeholder="Weight"
              />
            </div>
            
            <div className="form-group">
              <label className="label">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="input"
                placeholder="Height"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="label">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="input">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Activity Level</label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="input">
              <option value="">Select activity level</option>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (1-3 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="very_active">Very Active (physical job)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange} className="input">
              <option value="">Select your goal</option>
              <option value="lose_weight">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain_weight">Gain Weight</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Dietary Restrictions</label>
            <div className="checkbox-group">
              {['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'low-sodium', 'keto'].map(restriction => (
                <label key={restriction} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.dietaryRestrictions.includes(restriction)}
                    onChange={() => handleDietaryChange(restriction)}
                  />
                  <span>{restriction.charAt(0).toUpperCase() + restriction.slice(1).replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
