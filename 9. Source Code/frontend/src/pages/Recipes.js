import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Clock, Users, ChefHat } from 'lucide-react';
import './Recipes.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'snacks', 'desserts', 'drinks'];

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, selectedCategory, recipes]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    let filtered = recipes;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredRecipes(filtered);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Recipes</h1>
        <p>Discover healthy and delicious recipes for your nutrition journey</p>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            placeholder="Search recipes..."
          />
        </div>

        <div className="category-filters">
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

      <div className="recipes-grid">
        {filteredRecipes.length === 0 ? (
          <div className="empty-state">
            <p>No recipes found matching your criteria.</p>
          </div>
        ) : (
          filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card" onClick={() => handleRecipeClick(recipe)}>
              <div className="recipe-image">
                <ChefHat size={48} className="recipe-icon" />
              </div>
              
              <div className="recipe-content">
                <h3>{recipe.name}</h3>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-meta">
                  <span className="meta-item">
                    <Clock size={16} />
                    {recipe.prepTime + recipe.cookTime} min
                  </span>
                  <span className="meta-item">
                    <Users size={16} />
                    {recipe.servings} servings
                  </span>
                </div>

                <div className="recipe-nutrients">
                  <span className="nutrient-tag">{recipe.calories} cal</span>
                  <span className="nutrient-tag">{recipe.protein}g protein</span>
                </div>

                <div className="recipe-tags">
                  {recipe.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedRecipe && (
        <div className="recipe-modal" onClick={closeRecipeModal}>
          <div className="recipe-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeRecipeModal}>×</button>
            
            <h2>{selectedRecipe.name}</h2>
            <p className="modal-description">{selectedRecipe.description}</p>
            
            <div className="modal-meta">
              <div className="meta-box">
                <Clock size={20} />
                <div>
                  <span className="meta-label">Prep Time</span>
                  <span className="meta-value">{selectedRecipe.prepTime} min</span>
                </div>
              </div>
              <div className="meta-box">
                <Clock size={20} />
                <div>
                  <span className="meta-label">Cook Time</span>
                  <span className="meta-value">{selectedRecipe.cookTime} min</span>
                </div>
              </div>
              <div className="meta-box">
                <Users size={20} />
                <div>
                  <span className="meta-label">Servings</span>
                  <span className="meta-value">{selectedRecipe.servings}</span>
                </div>
              </div>
            </div>

            <div className="modal-nutrients">
              <h3>Nutrition per serving</h3>
              <div className="nutrients-grid">
                <div className="nutrient-box">
                  <span className="nutrient-label">Calories</span>
                  <span className="nutrient-value">{selectedRecipe.calories}</span>
                </div>
                <div className="nutrient-box">
                  <span className="nutrient-label">Protein</span>
                  <span className="nutrient-value">{selectedRecipe.protein}g</span>
                </div>
                <div className="nutrient-box">
                  <span className="nutrient-label">Carbs</span>
                  <span className="nutrient-value">{selectedRecipe.carbs}g</span>
                </div>
                <div className="nutrient-box">
                  <span className="nutrient-label">Fat</span>
                  <span className="nutrient-value">{selectedRecipe.fat}g</span>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h3>Ingredients</h3>
              <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3>Instructions</h3>
              <ol>
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="modal-tags">
              {selectedRecipe.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
