import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, Plus, Trash2, Sparkles } from 'lucide-react';
import './GroceryList.css';

const GroceryList = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('nutrition_grocery_items');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Rolled Oats (500g)', category: 'Grains', completed: false },
      { id: '2', name: 'Greek Yogurt (Whole Milk)', category: 'Dairy', completed: true },
      { id: '3', name: 'Chicken Breast (Organic)', category: 'Proteins', completed: false },
      { id: '4', name: 'Avocados (4 pcs)', category: 'Produce', completed: false },
      { id: '5', name: 'Fresh Blueberries', category: 'Produce', completed: false }
    ];
  });

  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('Produce');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    localStorage.setItem('nutrition_grocery_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    const item = {
      id: Date.now().toString(),
      name: newItem.trim(),
      category,
      completed: false
    };
    setItems([...items, item]);
    setNewItem('');
  };

  const toggleComplete = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const importRecipeIngredients = (recipe) => {
    const newGroceryItems = recipe.ingredients.map((ing, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: `${ing} (for ${recipe.name})`,
      category: 'Recipe Ingredients',
      completed: false
    }));
    setItems([...items, ...newGroceryItems]);
  };

  const clearCompleted = () => {
    setItems(items.filter(item => !item.completed));
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Grocery & Meal Prep Assistance</h1>
        <p>Organize your shopping list and auto-import ingredients from your favorite recipes</p>
      </div>

      <div className="grocery-layout">
        <div className="grocery-main">
          <form onSubmit={handleAddItem} className="add-grocery-form">
            <input
              type="text"
              className="input"
              placeholder="Add grocery item (e.g., Almond Milk, Quinoa, Salmon)..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <select className="input category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Produce">Produce</option>
              <option value="Proteins">Proteins</option>
              <option value="Grains">Grains</option>
              <option value="Dairy">Dairy</option>
              <option value="Healthy Fats">Healthy Fats</option>
              <option value="Pantry">Pantry</option>
            </select>
            <button type="submit" className="btn btn-primary">
              <Plus size={18} /> Add Item
            </button>
          </form>

          <div className="grocery-controls">
            <span>{items.filter(i => i.completed).length} of {items.length} items checked</span>
            <button onClick={clearCompleted} className="btn-text-danger">Clear Completed</button>
          </div>

          <div className="grocery-items-list">
            {items.length === 0 ? (
              <div className="empty-state">
                <p>Your grocery list is empty. Add items above or import ingredients from recipes!</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className={`grocery-item ${item.completed ? 'completed' : ''}`}>
                  <button className={`checkbox ${item.completed ? 'checked' : ''}`} onClick={() => toggleComplete(item.id)}>
                    {item.completed && <Check size={14} />}
                  </button>
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-cat">{item.category}</span>
                  </div>
                  <button className="btn-icon" onClick={() => deleteItem(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grocery-sidebar">
          <h3><Sparkles size={18} /> Quick Import from Recipes</h3>
          <p className="sidebar-desc">Click any recipe below to add all its required ingredients to your grocery list:</p>
          <div className="recipe-import-list">
            {recipes.map(recipe => (
              <div key={recipe.id} className="recipe-import-card">
                <div>
                  <strong>{recipe.name}</strong>
                  <span className="ing-count">{recipe.ingredients.length} ingredients</span>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => importRecipeIngredients(recipe)}>
                  + Import
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
