const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all foods
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    const where = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const foods = await prisma.food.findMany({
      where,
      orderBy: { name: 'asc' }
    });
    res.json(foods);
  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get food by ID
router.get('/:id', async (req, res) => {
  try {
    const food = await prisma.food.findUnique({
      where: { id: req.params.id }
    });
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    
    res.json(food);
  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new food (admin only)
router.post('/', auth, [
  body('name').notEmpty().withMessage('Food name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('calories').isNumeric().withMessage('Calories must be a number'),
  body('protein').isNumeric().withMessage('Protein must be a number'),
  body('carbs').isNumeric().withMessage('Carbs must be a number'),
  body('fat').isNumeric().withMessage('Fat must be a number'),
  body('servingSize').notEmpty().withMessage('Serving size is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, calories, protein, carbs, fat, fiber, sugar, sodium, servingSize } = req.body;

    const food = await prisma.food.create({
      data: {
        name,
        category,
        calories: parseFloat(calories),
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        fiber: fiber ? parseFloat(fiber) : null,
        sugar: sugar ? parseFloat(sugar) : null,
        sodium: sodium ? parseFloat(sodium) : null,
        servingSize
      }
    });

    res.status(201).json(food);
  } catch (error) {
    console.error('Create food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
