import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MealLogging from './pages/MealLogging';
import FoodDatabase from './pages/FoodDatabase';
import Recipes from './pages/Recipes';
import GroceryList from './pages/GroceryList';
import Education from './pages/Education';
import Consultations from './pages/Consultations';
import Profile from './pages/Profile';
import { AlertCircle } from 'lucide-react';
import './App.css';

const DisclaimerBanner = () => (
  <div className="medical-disclaimer-banner">
    <AlertCircle size={16} />
    <span>
      <strong>Important Health Notice:</strong> Nutrition Assistant provides personalized guidance for informational wellness purposes. It complements—but does not replace—professional medical or clinical dietary advice. Always consult a qualified healthcare provider for specific medical conditions.
    </span>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <DisclaimerBanner />
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/meals" element={<ProtectedRoute><MealLogging /></ProtectedRoute>} />
              <Route path="/foods" element={<ProtectedRoute><FoodDatabase /></ProtectedRoute>} />
              <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
              <Route path="/grocery" element={<ProtectedRoute><GroceryList /></ProtectedRoute>} />
              <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
              <Route path="/consultations" element={<ProtectedRoute><Consultations /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
