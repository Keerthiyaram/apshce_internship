const express = require('express');
const { body, validationResult } = require('express-validator');
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

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId || req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        age: true,
        weight: true,
        height: true,
        gender: true,
        activityLevel: true,
        goal: true,
        dietaryRestrictions: true,
        createdAt: true
      }
    });
    
    if (user) {
      user.dietaryRestrictions = safeParse(user.dietaryRestrictions);
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, [
  body('name').optional().notEmpty(),
  body('email').optional().isEmail(),
  body('age').optional().isNumeric(),
  body('weight').optional().isNumeric(),
  body('height').optional().isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, age, weight, height, gender, activityLevel, goal, dietaryRestrictions } = req.body;
    const userId = req.user.userId || req.user.id;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(age !== undefined && { age: parseInt(age) }),
        ...(weight !== undefined && { weight: parseFloat(weight) }),
        ...(height !== undefined && { height: parseFloat(height) }),
        ...(gender && { gender }),
        ...(activityLevel && { activityLevel }),
        ...(goal && { goal }),
        ...(dietaryRestrictions !== undefined && { dietaryRestrictions: JSON.stringify(dietaryRestrictions) })
      }
    });

    res.json({
      ...user,
      dietaryRestrictions: safeParse(user.dietaryRestrictions)
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get nutrition goals based on user profile
router.get('/goals', auth, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const weight = user.weight || 70;
    const height = user.height || 170;
    const age = user.age || 25;
    const gender = user.gender || 'male';

    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Adjust for activity level
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const tdee = bmr * (activityMultipliers[user.activityLevel] || 1.2);

    // Adjust for goals
    let targetCalories;
    switch (user.goal) {
      case 'lose_weight':
        targetCalories = tdee - 500;
        break;
      case 'gain_weight':
        targetCalories = tdee + 500;
        break;
      case 'maintain':
      default:
        targetCalories = tdee;
    }

    // Calculate macro targets (protein: 30%, carbs: 40%, fat: 30%)
    const targetProtein = (targetCalories * 0.30) / 4;
    const targetCarbs = (targetCalories * 0.40) / 4;
    const targetFat = (targetCalories * 0.30) / 9;

    res.json({
      targetCalories: Math.round(targetCalories),
      targetProtein: Math.round(targetProtein),
      targetCarbs: Math.round(targetCarbs),
      targetFat: Math.round(targetFat)
    });
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
