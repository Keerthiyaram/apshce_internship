const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const foods = [
  {
    name: 'Oats (Rolled)',
    category: 'Grains',
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    fiber: 10.6,
    sugar: 0,
    sodium: 2,
    servingSize: '100g'
  },
  {
    name: 'Greek Yogurt (Plain, Whole)',
    category: 'Dairy',
    calories: 97,
    protein: 9.0,
    carbs: 3.9,
    fat: 5.0,
    fiber: 0,
    sugar: 3.6,
    sodium: 36,
    servingSize: '100g'
  },
  {
    name: 'Chicken Breast (Grilled)',
    category: 'Proteins',
    calories: 165,
    protein: 31.0,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    servingSize: '100g'
  },
  {
    name: 'Salmon (Baked)',
    category: 'Proteins',
    calories: 206,
    protein: 22.0,
    carbs: 0,
    fat: 12.0,
    fiber: 0,
    sugar: 0,
    sodium: 61,
    servingSize: '100g'
  },
  {
    name: 'Avocado',
    category: 'Healthy Fats',
    calories: 160,
    protein: 2.0,
    carbs: 8.5,
    fat: 14.7,
    fiber: 6.7,
    sugar: 0.7,
    sodium: 7,
    servingSize: '100g'
  },
  {
    name: 'Almonds',
    category: 'Nuts & Seeds',
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fat: 49.9,
    fiber: 12.5,
    sugar: 4.4,
    sodium: 1,
    servingSize: '100g'
  },
  {
    name: 'Spinach (Fresh)',
    category: 'Vegetables',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    sugar: 0.4,
    sodium: 79,
    servingSize: '100g'
  },
  {
    name: 'Broccoli (Steam Cooked)',
    category: 'Vegetables',
    calories: 35,
    protein: 2.4,
    carbs: 7.2,
    fat: 0.4,
    fiber: 3.3,
    sugar: 1.4,
    sodium: 41,
    servingSize: '100g'
  },
  {
    name: 'Banana',
    category: 'Fruits',
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12.2,
    sodium: 1,
    servingSize: '1 Medium (118g)'
  },
  {
    name: 'Apple (Red)',
    category: 'Fruits',
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fat: 0.2,
    fiber: 2.4,
    sugar: 10.4,
    sodium: 1,
    servingSize: '1 Medium (182g)'
  },
  {
    name: 'Eggs (Boiled)',
    category: 'Proteins',
    calories: 155,
    protein: 12.6,
    carbs: 1.1,
    fat: 10.6,
    fiber: 0,
    sugar: 1.1,
    sodium: 124,
    servingSize: '2 Large Eggs'
  },
  {
    name: 'Brown Rice (Cooked)',
    category: 'Grains',
    calories: 123,
    protein: 2.7,
    carbs: 25.6,
    fat: 1.0,
    fiber: 1.6,
    sugar: 0.4,
    sodium: 1,
    servingSize: '100g'
  },
  {
    name: 'Quinoa (Cooked)',
    category: 'Grains',
    calories: 120,
    protein: 4.4,
    carbs: 21.3,
    fat: 1.9,
    fiber: 2.8,
    sugar: 0.9,
    sodium: 7,
    servingSize: '100g'
  },
  {
    name: 'Sweet Potato (Baked)',
    category: 'Vegetables',
    calories: 90,
    protein: 2.0,
    carbs: 20.7,
    fat: 0.2,
    fiber: 3.3,
    sugar: 6.5,
    sodium: 36,
    servingSize: '100g'
  },
  {
    name: 'Tofu (Firm)',
    category: 'Proteins',
    calories: 144,
    protein: 15.6,
    carbs: 3.5,
    fat: 8.7,
    fiber: 2.3,
    sugar: 0.5,
    sodium: 14,
    servingSize: '100g'
  },
  {
    name: 'Blueberries (Fresh)',
    category: 'Fruits',
    calories: 57,
    protein: 0.7,
    carbs: 14.5,
    fat: 0.3,
    fiber: 2.4,
    sugar: 9.9,
    sodium: 1,
    servingSize: '100g'
  },
  {
    name: 'Olive Oil (Extra Virgin)',
    category: 'Healthy Fats',
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100.0,
    fiber: 0,
    sugar: 0,
    sodium: 2,
    servingSize: '1 Tablespoon (15ml)'
  },
  {
    name: 'Whey Protein Powder',
    category: 'Supplements',
    calories: 120,
    protein: 24.0,
    carbs: 3.0,
    fat: 1.5,
    fiber: 0,
    sugar: 1.0,
    sodium: 140,
    servingSize: '1 Scoop (30g)'
  }
];

const recipes = [
  {
    name: 'High-Protein Quinoa Chicken Bowl',
    description: 'A nutrient-packed grain bowl filled with grilled chicken, fluffy quinoa, steamed broccoli, and avocado slice.',
    ingredients: JSON.stringify(['150g Grilled Chicken Breast', '100g Cooked Quinoa', '80g Steamed Broccoli', '1/2 Sliced Avocado', '1 tbsp Olive Oil Dressing']),
    instructions: JSON.stringify(['Cook quinoa according to package directions.', 'Grill chicken breast until internal temperature reaches 165°F.', 'Steam broccoli florets for 4-5 mins.', 'Assemble quinoa, chicken, and broccoli in a bowl.', 'Top with fresh sliced avocado and drizzle with olive oil.']),
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    calories: 520,
    protein: 42.0,
    carbs: 45.0,
    fat: 18.0,
    category: 'Lunch',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    tags: JSON.stringify(['high-protein', 'gluten-free', 'clean-eating'])
  },
  {
    name: 'Berry Avocado Energy Smoothie Bowl',
    description: 'Creamy, antioxidant-rich berry smoothie topped with sliced banana, chia seeds, and crunchy almonds.',
    ingredients: JSON.stringify(['1 cup Frozen Blueberries', '1/2 ripe Avocado', '1 Scoop Whey Protein', '200ml Almond Milk', '1 tbsp Chia Seeds']),
    instructions: JSON.stringify(['Combine blueberries, avocado, protein powder, and almond milk in a high-speed blender.', 'Blend until thick and smooth.', 'Pour into a bowl and garnish with chia seeds and fresh berries.']),
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    calories: 380,
    protein: 28.0,
    carbs: 34.0,
    fat: 14.0,
    category: 'Breakfast',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
    tags: JSON.stringify(['vegetarian', 'high-protein', 'antioxidants'])
  },
  {
    name: 'Baked Salmon with Garlic Asparagus',
    description: 'Wild-caught salmon baked with lemon garlic herbs alongside tender roasted asparagus spears.',
    ingredients: JSON.stringify(['200g Fresh Salmon Fillet', '150g Fresh Asparagus', '2 cloves Minced Garlic', '1 tbsp Extra Virgin Olive Oil', 'Lemon slices and herbs']),
    instructions: JSON.stringify(['Preheat oven to 400°F (200°C).', 'Place salmon fillet and trimmed asparagus on a baking sheet lined with foil.', 'Drizzle with olive oil, minced garlic, salt, pepper, and lemon juice.', 'Bake for 12-15 minutes until salmon flakes easily with a fork.']),
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    calories: 450,
    protein: 38.0,
    carbs: 8.0,
    fat: 28.0,
    category: 'Dinner',
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
    tags: JSON.stringify(['keto', 'low-carb', 'omega-3', 'gluten-free'])
  },
  {
    name: 'Mediterranean Tofu Stir-Fry',
    description: 'Crispy pan-seared tofu tossed with colorful bell peppers, spinach, and brown rice.',
    ingredients: JSON.stringify(['200g Firm Tofu (cubed)', '1 Red Bell Pepper (sliced)', '2 cups Fresh Spinach', '100g Brown Rice', '1 tbsp Low-Sodium Soy Sauce']),
    instructions: JSON.stringify(['Press tofu to remove excess moisture and cube.', 'Pan-fry tofu cubes in olive oil until golden brown on all sides.', 'Saute bell peppers and spinach until tender-crisp.', 'Combine with cooked brown rice and toss with soy sauce.']),
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    calories: 390,
    protein: 22.0,
    carbs: 48.0,
    fat: 12.0,
    category: 'Dinner',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    tags: JSON.stringify(['vegan', 'vegetarian', 'dairy-free'])
  }
];

async function seed() {
  console.log('Seeding initial data into MongoDB Atlas...');
  
  // Clear existing food & recipe collections
  await prisma.food.deleteMany();
  await prisma.recipe.deleteMany();

  // Create foods
  for (const food of foods) {
    await prisma.food.create({ data: food });
  }
  console.log(`Successfully seeded ${foods.length} foods.`);

  // Create recipes
  for (const recipe of recipes) {
    await prisma.recipe.create({ data: recipe });
  }
  console.log(`Successfully seeded ${recipes.length} recipes.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
