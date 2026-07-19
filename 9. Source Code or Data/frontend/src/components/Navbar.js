import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Utensils, User, LogOut, Home, BookOpen, Apple, ShoppingBag, GraduationCap, UserCheck } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <Utensils size={24} color="#10b981" />
          <span>Nutrition Assistant</span>
        </Link>
        
        {user && (
          <div className="navbar-menu">
            <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}>
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link to="/meals" className={`navbar-link ${isActive('/meals') ? 'active' : ''}`}>
              <Apple size={18} />
              <span>Meals</span>
            </Link>
            <Link to="/foods" className={`navbar-link ${isActive('/foods') ? 'active' : ''}`}>
              <BookOpen size={18} />
              <span>Foods</span>
            </Link>
            <Link to="/recipes" className={`navbar-link ${isActive('/recipes') ? 'active' : ''}`}>
              <Utensils size={18} />
              <span>Recipes</span>
            </Link>
            <Link to="/grocery" className={`navbar-link ${isActive('/grocery') ? 'active' : ''}`}>
              <ShoppingBag size={18} />
              <span>Grocery</span>
            </Link>
            <Link to="/education" className={`navbar-link ${isActive('/education') ? 'active' : ''}`}>
              <GraduationCap size={18} />
              <span>Guides</span>
            </Link>
            <Link to="/consultations" className={`navbar-link ${isActive('/consultations') ? 'active' : ''}`}>
              <UserCheck size={18} />
              <span>Consult</span>
            </Link>
            <Link to="/profile" className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}>
              <User size={18} />
              <span>Profile</span>
            </Link>
            <button onClick={handleLogout} className="navbar-logout">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
