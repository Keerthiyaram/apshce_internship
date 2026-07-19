import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { User, Target, Activity, Save } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    goal: '',
    dietaryRestrictions: []
  });
  const [goals, setGoals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      const parsedRestrictions = Array.isArray(user.dietaryRestrictions) 
        ? user.dietaryRestrictions 
        : (typeof user.dietaryRestrictions === 'string' ? JSON.parse(user.dietaryRestrictions || '[]') : []);
      
      setProfile({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        weight: user.weight || '',
        height: user.height || '',
        gender: user.gender || '',
        activityLevel: user.activityLevel || '',
        goal: user.goal || '',
        dietaryRestrictions: parsedRestrictions
      });
      fetchGoals();
    }
    setLoading(false);
  }, [user]);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/goals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleDietaryChange = (restriction) => {
    const updated = profile.dietaryRestrictions.includes(restriction)
      ? profile.dietaryRestrictions.filter(r => r !== restriction)
      : [...profile.dietaryRestrictions, restriction];
    setProfile({ ...profile, dietaryRestrictions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage('Profile updated successfully!');
      fetchGoals();
      
      // Update local storage
      const updatedUser = { ...user, ...profile };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1><User size={32} /> Profile</h1>
        <p>Manage your personal information and nutrition goals</p>
      </div>

      <div className="profile-layout">
        <div className="profile-form-section">
          <div className="card">
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="input"
                  disabled
                />
                <small className="text-muted">Email cannot be changed</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="label">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={profile.weight}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="label">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={profile.height}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Gender</label>
                <select name="gender" value={profile.gender} onChange={handleChange} className="input">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label"><Activity size={16} /> Activity Level</label>
                <select name="activityLevel" value={profile.activityLevel} onChange={handleChange} className="input">
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very_active">Very Active (physical job)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label"><Target size={16} /> Goal</label>
                <select name="goal" value={profile.goal} onChange={handleChange} className="input">
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
                        checked={profile.dietaryRestrictions.includes(restriction)}
                        onChange={() => handleDietaryChange(restriction)}
                      />
                      <span>{restriction.charAt(0).toUpperCase() + restriction.slice(1).replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

              <button type="submit" className="btn btn-primary" disabled={saving}>
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>

        <div className="profile-goals-section">
          {goals && (
            <div className="card">
              <h2><Target size={24} /> Your Daily Goals</h2>
              <p className="goals-subtitle">Based on your profile and activity level</p>
              
              <div className="goals-grid">
                <div className="goal-item">
                  <div className="goal-icon calories">
                    <span>🔥</span>
                  </div>
                  <div className="goal-content">
                    <span className="goal-label">Calories</span>
                    <span className="goal-value">{goals.targetCalories}</span>
                  </div>
                </div>

                <div className="goal-item">
                  <div className="goal-icon protein">
                    <span>💪</span>
                  </div>
                  <div className="goal-content">
                    <span className="goal-label">Protein</span>
                    <span className="goal-value">{goals.targetProtein}g</span>
                  </div>
                </div>

                <div className="goal-item">
                  <div className="goal-icon carbs">
                    <span>🍞</span>
                  </div>
                  <div className="goal-content">
                    <span className="goal-label">Carbs</span>
                    <span className="goal-value">{goals.targetCarbs}g</span>
                  </div>
                </div>

                <div className="goal-item">
                  <div className="goal-icon fat">
                    <span>🥑</span>
                  </div>
                  <div className="goal-content">
                    <span className="goal-label">Fat</span>
                    <span className="goal-value">{goals.targetFat}g</span>
                  </div>
                </div>
              </div>

              <div className="goals-info">
                <p><strong>Note:</strong> These goals are calculated based on your BMR (Basal Metabolic Rate), activity level, and fitness goals. Adjust your profile to see updated recommendations.</p>
              </div>
            </div>
          )}

          <div className="card">
            <h2>Account Info</h2>
            <div className="account-info">
              <div className="info-row">
                <span className="info-label">Member Since</span>
                <span className="info-value">{user ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Account Type</span>
                <span className="info-value">Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
