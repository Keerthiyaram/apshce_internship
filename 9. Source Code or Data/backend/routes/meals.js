const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

const getUserId = (req) => req.user.userId || req.user.id;

// Get all meals for a user
router.get('/', auth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const meals = await prisma.meal.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    });
    res.json(meals);
  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new meal
router.post('/', auth, [
  body('name').notEmpty().withMessage('Meal name is required'),
  body('mealType').notEmpty().withMessage('Meal type is required'),
  body('foods').isArray().withMessage('Foods must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, mealType, foods } = req.body;
    const userId = getUserId(req);

    // Calculate totals
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    const foodItems = foods.map(food => {
      const s = food.servings || 1;
      totalCalories += (food.calories || 0) * s;
      totalProtein += (food.protein || 0) * s;
      totalCarbs += (food.carbs || 0) * s;
      totalFat += (food.fat || 0) * s;

      return {
        foodName: food.foodName || food.name,
        calories: food.calories || 0,
        protein: food.protein || 0,
        carbs: food.carbs || 0,
        fat: food.fat || 0,
        servings: s
      };
    });

    const meal = await prisma.meal.create({
      data: {
        userId,
        name,
        mealType,
        foods: foodItems,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat
      }
    });

    // Update daily log
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let dailyLog = await prisma.dailyLog.findFirst({
      where: {
        userId,
        date: {
          gte: today
        }
      }
    });

    if (dailyLog) {
      await prisma.dailyLog.update({
        where: { id: dailyLog.id },
        data: {
          consumedCalories: (dailyLog.consumedCalories || 0) + totalCalories,
          consumedProtein: (dailyLog.consumedProtein || 0) + totalProtein,
          consumedCarbs: (dailyLog.consumedCarbs || 0) + totalCarbs,
          consumedFat: (dailyLog.consumedFat || 0) + totalFat
        }
      });
    } else {
      await prisma.dailyLog.create({
        data: {
          userId,
          consumedCalories: totalCalories,
          consumedProtein: totalProtein,
          consumedCarbs: totalCarbs,
          consumedFat: totalFat
        }
      });
    }

    res.status(201).json(meal);
  } catch (error) {
    console.error('Create meal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get daily log
router.get('/daily-log', auth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyLog = await prisma.dailyLog.findFirst({
      where: {
        userId,
        date: {
          gte: today
        }
      }
    });

    if (!dailyLog) {
      return res.json({
        consumedCalories: 0,
        consumedProtein: 0,
        consumedCarbs: 0,
        consumedFat: 0,
        waterIntake: 0
      });
    }

    res.json(dailyLog);
  } catch (error) {
    console.error('Get daily log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update daily log
router.put('/daily-log', auth, async (req, res) => {
  try {
    const { targetCalories, waterIntake, notes } = req.body;
    const userId = getUserId(req);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dailyLog = await prisma.dailyLog.findFirst({
      where: {
        userId,
        date: {
          gte: today
        }
      }
    });

    if (dailyLog) {
      const updated = await prisma.dailyLog.update({
        where: { id: dailyLog.id },
        data: {
          targetCalories: targetCalories !== undefined ? parseFloat(targetCalories) : dailyLog.targetCalories,
          waterIntake: waterIntake !== undefined ? parseFloat(waterIntake) : dailyLog.waterIntake,
          notes: notes || dailyLog.notes
        }
      });
      res.json(updated);
    } else {
      const created = await prisma.dailyLog.create({
        data: {
          userId,
          targetCalories: targetCalories ? parseFloat(targetCalories) : null,
          waterIntake: waterIntake ? parseFloat(waterIntake) : null,
          notes,
          consumedCalories: 0,
          consumedProtein: 0,
          consumedCarbs: 0,
          consumedFat: 0
        }
      });
      res.json(created);
    }
  } catch (error) {
    console.error('Update daily log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete meal
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = getUserId(req);
    const meal = await prisma.meal.findUnique({
      where: { id: req.params.id }
    });

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    if (meal.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.meal.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Meal deleted' });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
