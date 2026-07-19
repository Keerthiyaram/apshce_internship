import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter } from 'lucide-react';
import './FoodDatabase.css';

const FoodDatabase = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'fruits', 'vegetables', 'proteins', 'grains', 'dairy', 'fats', 'beverages'];

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    filterFoods();
  }, [searchTerm, selectedCategory, foods]);

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/foods');
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFoods = () => {
    let filtered = foods;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(food => food.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFoods(filtered);
  };

  if (loading) {
    return <div className="loading">Loading food database...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Food Database</h1>
        <p>Browse and search nutritional information for various foods</p>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            placeholder="Search foods..."
          />
        </div>

        <div className="category-filters">
          <Filter size={20} className="filter-icon" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="foods-grid">
        {filteredFoods.length === 0 ? (
          <div className="empty-state">
            <p>No foods found matching your criteria.</p>
          </div>
        ) : (
          filteredFoods.map(food => (
            <div key={food.id} className="food-card">
              <div className="food-header">
                <h3>{food.name}</h3>
                <span className="food-category">{food.category}</span>
              </div>
              
              <div className="food-nutrients">
                <div className="nutrient-row">
                  <span className="nutrient-name">Calories</span>
                  <span className="nutrient-value">{food.calories}</span>
                </div>
                <div className="nutrient-row">
                  <span className="nutrient-name">Protein</span>
                  <span className="nutrient-value">{food.protein}g</span>
                </div>
                <div className="nutrient-row">
                  <span className="nutrient-name">Carbs</span>
                  <span className="nutrient-value">{food.carbs}g</span>
                </div>
                <div className="nutrient-row">
                  <span className="nutrient-name">Fat</span>
                  <span className="nutrient-value">{food.fat}g</span>
                </div>
                {food.fiber && (
                  <div className="nutrient-row">
                    <span className="nutrient-name">Fiber</span>
                    <span className="nutrient-value">{food.fiber}g</span>
                  </div>
                )}
                {food.sugar && (
                  <div className="nutrient-row">
                    <span className="nutrient-name">Sugar</span>
                    <span className="nutrient-value">{food.sugar}g</span>
                  </div>
                )}
              </div>

              <div className="food-serving">
                <span>Serving Size: {food.servingSize}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FoodDatabase;
