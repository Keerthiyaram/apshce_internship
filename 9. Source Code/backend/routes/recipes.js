const express = require('express');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

const safeParse = (val) => {
  if (Array.isArray(val) || (typeof val === 'object' && val !== null)) return val;
  if (!val) return [];
  try {
    return JSON.parse(val);
  } catch (e) {
    return [];
  }
};

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, tags } = req.query;
    
    const where = {};
    if (category) {
      where.category = category;
    }
    if (difficulty) {
      where.difficulty = difficulty;
    }

    const recipes = await prisma.recipe.findMany({
      where,
      orderBy: { name: 'asc' }
    });
    
    // Parse JSON strings for ingredients, instructions, and tags
    const parsedRecipes = recipes.map(recipe => ({
      ...recipe,
      ingredients: safeParse(recipe.ingredients),
      instructions: safeParse(recipe.instructions),
      tags: safeParse(recipe.tags)
    }));
    
    res.json(parsedRecipes);
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: req.params.id }
    });
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Parse JSON strings
    const parsedRecipe = {
      ...recipe,
      ingredients: safeParse(recipe.ingredients),
      instructions: safeParse(recipe.instructions),
      tags: safeParse(recipe.tags)
    };
    
    res.json(parsedRecipe);
  } catch (error) {
    console.error('Get recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get personalized recipe recommendations
router.get('/recommendations/:userId', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const where = {};
    
    // Filter by goal
    if (user.goal) {
      if (user.goal === 'lose_weight') {
        where.calories = { lte: 550 };
      } else if (user.goal === 'gain_weight') {
        where.calories = { gte: 400 };
      }
    }

    let recipes = await prisma.recipe.findMany({
      where,
      orderBy: { name: 'asc' },
      take: 20
    });

    const dietaryRestrictions = safeParse(user.dietaryRestrictions);
    
    // Filter by dietary restrictions in code if present
    if (dietaryRestrictions && dietaryRestrictions.length > 0) {
      recipes = recipes.filter(recipe => {
        const recipeTags = safeParse(recipe.tags);
        return dietaryRestrictions.every(restriction => recipeTags.includes(restriction));
      });
    }

    // Fallback to all recipes if filtered set is empty
    if (recipes.length === 0) {
      recipes = await prisma.recipe.findMany({ take: 5 });
    }
    
    const parsedRecipes = recipes.slice(0, 10).map(recipe => ({
      ...recipe,
      ingredients: safeParse(recipe.ingredients),
      instructions: safeParse(recipe.instructions),
      tags: safeParse(recipe.tags)
    }));

    res.json(parsedRecipes);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
