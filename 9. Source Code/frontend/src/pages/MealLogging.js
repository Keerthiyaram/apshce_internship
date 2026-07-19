import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Clock } from 'lucide-react';
import './MealLogging.css';

const MealLogging = () => {
  const [meals, setMeals] = useState([]);
  const [dbFoods, setDbFoods] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    mealType: 'breakfast',
    foods: []
  });
  const [selectedFood, setSelectedFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    servings: 1
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeals();
    fetchDbFoods();
  }, []);

  const fetchMeals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/meals', {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => ({ data: [] }));
      setMeals(response.data || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDbFoods = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/foods').catch(() => ({ data: [] }));
      setDbFoods(res.data || []);
    } catch (error) {
      console.error('Error fetching food database:', error);
      setDbFoods([]);
    }
  };

  const handleSelectDbFood = (e) => {
    const foodId = e.target.value;
    if (!foodId) return;
    const food = dbFoods.find(f => f.id === foodId);
    if (food) {
      setSelectedFood({
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        servings: 1
      });
    }
  };

  const handleAddFood = () => {
    if (selectedFood.name && selectedFood.calories !== '') {
      setNewMeal({
        ...newMeal,
        foods: [...newMeal.foods, { ...selectedFood }]
      });
      setSelectedFood({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        servings: 1
      });
    }
  };

  const handleRemoveFood = (index) => {
    setNewMeal({
      ...newMeal,
      foods: newMeal.foods.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/meals', newMeal, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewMeal({ name: '', mealType: 'breakfast', foods: [] });
      setShowAddForm(false);
      fetchMeals();
    } catch (error) {
      console.error('Error creating meal:', error);
    }
  };

  const handleDeleteMeal = async (mealId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/meals/${mealId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMeals();
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const calculateMealTotals = (foods) => {
    if (!foods || !Array.isArray(foods)) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    return foods.reduce((acc, food) => ({
      calories: acc.calories + ((food.calories || 0) * (food.servings || 1)),
      protein: acc.protein + ((food.protein || 0) * (food.servings || 1)),
      carbs: acc.carbs + ((food.carbs || 0) * (food.servings || 1)),
      fat: acc.fat + ((food.fat || 0) * (food.servings || 1))
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  if (loading) {
    return <div className="loading">Loading meal tracker...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Meal Logging & Nutritional Tracker</h1>
        <p>Log your daily breakfast, lunch, dinner, and snacks to monitor calorie & nutrient intake</p>
        <button className="btn btn-primary mt-20" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={18} /> Add New Meal
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h2>Log New Meal</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Meal Title</label>
              <input
                type="text"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                className="input"
                placeholder="e.g., Healthy Breakfast Oats & Fruit"
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Meal Category</label>
              <select
                value={newMeal.mealType}
                onChange={(e) => setNewMeal({ ...newMeal, mealType: e.target.value })}
                className="input"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div className="food-input-section">
              <h3>Select Food Item</h3>
              
              {dbFoods.length > 0 && (
                <div className="form-group">
                  <label className="label">Quick Select from Food Database:</label>
                  <select className="input" onChange={handleSelectDbFood} defaultValue="">
                    <option value="" disabled>-- Select a food item to auto-fill --</option>
                    {dbFoods.map(f => (
                      <option key={f.id} value={f.id}>{f.name} ({f.category} - {f.calories} kcal)</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="food-input-grid">
                <input
                  type="text"
                  value={selectedFood.name}
                  onChange={(e) => setSelectedFood({ ...selectedFood, name: e.target.value })}
                  className="input"
                  placeholder="Food name"
                />
                <input
                  type="number"
                  value={selectedFood.calories}
                  onChange={(e) => setSelectedFood({ ...selectedFood, calories: parseFloat(e.target.value) || '' })}
                  className="input"
                  placeholder="Calories (kcal)"
                />
                <input
                  type="number"
                  value={selectedFood.protein}
                  onChange={(e) => setSelectedFood({ ...selectedFood, protein: parseFloat(e.target.value) || '' })}
                  className="input"
                  placeholder="Protein (g)"
                />
                <input
                  type="number"
                  value={selectedFood.carbs}
                  onChange={(e) => setSelectedFood({ ...selectedFood, carbs: parseFloat(e.target.value) || '' })}
                  className="input"
                  placeholder="Carbs (g)"
                />
                <input
                  type="number"
                  value={selectedFood.fat}
                  onChange={(e) => setSelectedFood({ ...selectedFood, fat: parseFloat(e.target.value) || '' })}
                  className="input"
                  placeholder="Fat (g)"
                />
                <input
                  type="number"
                  value={selectedFood.servings}
                  onChange={(e) => setSelectedFood({ ...selectedFood, servings: parseFloat(e.target.value) || 1 })}
                  className="input"
                  placeholder="Servings"
                  min="0.1"
                  step="0.1"
                />
              </div>

              <button type="button" onClick={handleAddFood} className="btn btn-secondary mt-20">
                <Plus size={16} /> Add Food Item to Meal
              </button>

              {newMeal.foods.length > 0 && (
                <div className="added-foods mt-20">
                  <h4>Items in this Meal:</h4>
                  {newMeal.foods.map((food, index) => (
                    <div key={index} className="added-food-item">
                      <span><strong>{food.name}</strong> ({food.servings}x) - {Math.round((food.calories || 0) * food.servings)} kcal</span>
                      <button type="button" onClick={() => handleRemoveFood(index)} className="btn-icon">
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-actions mt-20">
              <button type="submit" className="btn btn-primary" disabled={newMeal.foods.length === 0}>
                Save Logged Meal
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="meals-list">
        {meals.length === 0 ? (
          <div className="empty-state">
            <p>No meals logged yet. Click "Add New Meal" above to record your first meal!</p>
          </div>
        ) : (
          meals.map((meal) => {
            const totals = calculateMealTotals(meal.foods);
            return (
              <div key={meal.id} className="meal-card">
                <div className="meal-header">
                  <div>
                    <h3>{meal.name}</h3>
                    <span className="meal-type">{meal.mealType?.toUpperCase()}</span>
                  </div>
                  <div className="meal-time">
                    <Clock size={16} />
                    {new Date(meal.date).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="meal-nutrients">
                  <div className="nutrient">
                    <span className="nutrient-label">Calories</span>
                    <span className="nutrient-value">{totals.calories.toFixed(0)} kcal</span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-label">Protein</span>
                    <span className="nutrient-value">{totals.protein.toFixed(1)}g</span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-label">Carbs</span>
                    <span className="nutrient-value">{totals.carbs.toFixed(1)}g</span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-label">Fat</span>
                    <span className="nutrient-value">{totals.fat.toFixed(1)}g</span>
                  </div>
                </div>

                <div className="meal-foods">
                  {Array.isArray(meal.foods) && meal.foods.map((food, index) => (
                    <span key={index} className="food-tag">
                      {food.foodName || food.name} ({food.servings || 1}x)
                    </span>
                  ))}
                </div>

                <button onClick={() => handleDeleteMeal(meal.id)} className="btn-delete" title="Delete Meal">
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MealLogging;
