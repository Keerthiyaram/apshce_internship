import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TrendingUp, Target, Droplets, Flame, Utensils, Calendar, Plus, ChefHat, HeartPulse } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dailyLog, setDailyLog] = useState({ consumedCalories: 0, consumedProtein: 0, consumedCarbs: 0, consumedFat: 0, waterIntake: 0 });
  const [goals, setGoals] = useState({ targetCalories: 2000, targetProtein: 150, targetCarbs: 200, targetFat: 65 });
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [dailyRes, goalsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/meals/daily-log', { headers })
          .catch(() => ({ data: { consumedCalories: 0, consumedProtein: 0, consumedCarbs: 0, consumedFat: 0, waterIntake: 0 } })),
        axios.get('http://localhost:5000/api/users/goals', { headers })
          .catch(() => ({ data: { targetCalories: 2000, targetProtein: 150, targetCarbs: 200, targetFat: 65 } }))
      ]);

      setDailyLog(dailyRes.data || { consumedCalories: 0, consumedProtein: 0, consumedCarbs: 0, consumedFat: 0, waterIntake: 0 });
      setGoals(goalsRes.data || { targetCalories: 2000, targetProtein: 150, targetCarbs: 200, targetFat: 65 });

      const userId = user?.id || user?._id;
      if (userId) {
        const recipeRes = await axios.get(`http://localhost:5000/api/recipes/recommendations/${userId}`).catch(() => ({ data: [] }));
        setRecommendedRecipes(recipeRes.data || []);
      } else {
        const recipeRes = await axios.get('http://localhost:5000/api/recipes').catch(() => ({ data: [] }));
        setRecommendedRecipes(recipeRes.data || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addWater = async (amount) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const currentWater = dailyLog?.waterIntake || 0;
      const updatedWater = currentWater + amount;

      await axios.put('http://localhost:5000/api/meals/daily-log', {
        waterIntake: updatedWater
      }, { headers }).catch(err => console.error('Water update catch:', err));

      setDailyLog(prev => ({ ...prev, waterIntake: updatedWater }));
    } catch (error) {
      console.error('Error updating water intake:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading personalized dashboard...</div>;
  }

  const calculateProgress = (consumed, target) => {
    if (!target || target <= 0) return 0;
    return Math.min(((consumed || 0) / target) * 100, 100);
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <p className="dashboard-date"><Calendar size={18} /> {today}</p>
        </div>
        <div className="user-goal-badge">
          <HeartPulse size={18} /> Goal: {user?.goal ? user.goal.replace('_', ' ').toUpperCase() : 'HEALTH & WELLNESS'}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon calories">
            <Flame size={28} />
          </div>
          <div className="stat-content">
            <h3>Calories Target</h3>
            <div className="stat-value">
              {dailyLog?.consumedCalories ? Math.round(dailyLog.consumedCalories) : 0} / {goals?.targetCalories || 2000} kcal
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill calories" 
                style={{ width: `${calculateProgress(dailyLog?.consumedCalories, goals?.targetCalories || 2000)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon protein">
            <Target size={28} />
          </div>
          <div className="stat-content">
            <h3>Protein Target</h3>
            <div className="stat-value">
              {dailyLog?.consumedProtein ? dailyLog.consumedProtein.toFixed(1) : 0}g / {goals?.targetProtein || 150}g
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill protein" 
                style={{ width: `${calculateProgress(dailyLog?.consumedProtein, goals?.targetProtein || 150)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon carbs">
            <TrendingUp size={28} />
          </div>
          <div className="stat-content">
            <h3>Carbs Target</h3>
            <div className="stat-value">
              {dailyLog?.consumedCarbs ? dailyLog.consumedCarbs.toFixed(1) : 0}g / {goals?.targetCarbs || 200}g
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill carbs" 
                style={{ width: `${calculateProgress(dailyLog?.consumedCarbs, goals?.targetCarbs || 200)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon fat">
            <Droplets size={28} />
          </div>
          <div className="stat-content">
            <h3>Fat Target</h3>
            <div className="stat-value">
              {dailyLog?.consumedFat ? dailyLog.consumedFat.toFixed(1) : 0}g / {goals?.targetFat || 65}g
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill fat" 
                style={{ width: `${calculateProgress(dailyLog?.consumedFat, goals?.targetFat || 65)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3><Droplets size={20} color="#0284c7" /> Water Intake Tracker</h3>
          <div className="water-tracker">
            <div className="water-level">
              <span className="water-amount">{((dailyLog?.waterIntake || 0) / 1000).toFixed(2)} L</span>
              <span className="water-goal">Goal: 2.50 L</span>
            </div>
            <div className="water-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => addWater(250)}>
                <Plus size={14} /> 250ml
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => addWater(500)}>
                <Plus size={14} /> 500ml
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h3><Utensils size={20} color="#10b981" /> Quick Meal Actions</h3>
          <div className="quick-actions">
            <button className="action-btn" onClick={() => navigate('/meals')}>Log Breakfast</button>
            <button className="action-btn" onClick={() => navigate('/meals')}>Log Lunch</button>
            <button className="action-btn" onClick={() => navigate('/meals')}>Log Dinner</button>
            <button className="action-btn" onClick={() => navigate('/meals')}>Log Snack</button>
          </div>
        </div>
      </div>

      {recommendedRecipes.length > 0 && (
        <div className="card mt-20">
          <h3><ChefHat size={22} color="#f59e0b" /> Tailored Recipe Recommendations for You</h3>
          <div className="rec-recipes-grid">
            {recommendedRecipes.slice(0, 3).map(recipe => (
              <div key={recipe.id || recipe.name} className="rec-recipe-card" onClick={() => navigate('/recipes')}>
                <h4>{recipe.name}</h4>
                <p>{recipe.description}</p>
                <div className="rec-meta">
                  <span>{recipe.calories} kcal</span> • <span>{recipe.protein}g protein</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
