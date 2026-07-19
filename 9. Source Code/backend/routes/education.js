const express = require('express');
const router = express.Router();

const articles = [
  {
    id: '1',
    title: 'Understanding Macro & Micronutrients for Optimal Health',
    category: 'Balanced Eating',
    readTime: '5 min read',
    summary: 'A comprehensive guide to carbohydrates, proteins, fats, vitamins, and minerals required by the human body for peak daily performance.',
    content: `A balanced diet relies on two primary categories of nutrients: macronutrients and micronutrients. 

Macronutrients include:
- **Carbohydrates**: Your body's primary energy source. Focus on complex carbs like oats, quinoa, brown rice, and sweet potatoes.
- **Proteins**: Essential for tissue repair, muscle synthesis, and immune function. Sources include lean meats, fish, tofu, legumes, and eggs.
- **Healthy Fats**: Vital for hormone regulation and brain health. Incorporate avocados, nuts, seeds, and extra virgin olive oil.

Micronutrients consist of essential vitamins (A, C, D, E, K, B-complex) and minerals (iron, calcium, magnesium, potassium, zinc) that fuel cellular processes.`,
    tags: ['Macronutrients', 'Basics', 'Wellness']
  },
  {
    title: 'Nutrition Strategies for Weight Management & Fat Loss',
    category: 'Weight Management',
    readTime: '6 min read',
    summary: 'Discover evidence-based strategies for sustainable weight loss without sacrificing energy levels or lean muscle mass.',
    content: `Weight management is rooted in energy balance, but food quality plays a pivotal role in satiety, metabolic health, and muscle preservation.

Key Principles:
1. **Caloric Deficit**: Aim for a moderate deficit (300-500 kcal/day) for gradual, sustainable progress.
2. **High Protein Intake**: Consuming 1.6-2.2g of protein per kg of body weight preserves lean muscle tissue and increases satiety.
3. **Fiber-Rich Foods**: Soluble and insoluble fiber from vegetables, berries, and legumes slow digestion and maintain stable blood sugar levels.
4. **Hydration**: Drinking 2.5-3.5L of water daily aids digestion, nutrient transport, and appetite regulation.`,
    tags: ['Weight Loss', 'Fitness', 'Satiety']
  },
  {
    title: 'Fueling Athletic Performance: Pre and Post-Workout Nutrition',
    category: 'Athletic Performance',
    readTime: '7 min read',
    summary: 'Maximize workout energy, endurance, and muscular recovery through precise nutritional timing.',
    content: `Timing your food intake around physical activity optimizes performance and speeds up recovery.

**Pre-Workout (1-2 hours before):**
- Eat easily digestible carbohydrates paired with a moderate amount of protein.
- Example: Oatmeal with berries or a banana with peanut butter.

**Post-Workout (Within 45 mins):**
- Combine fast-absorbing protein with carbohydrates to initiate muscle protein synthesis and replenish glycogen stores.
- Example: Whey protein smoothie with fruit or grilled chicken with sweet potato.`,
    tags: ['Sports Nutrition', 'Performance', 'Muscle Gain']
  },
  {
    title: 'Managing Health Conditions: Diabetes & Cardiovascular Health',
    category: 'Health Conditions',
    readTime: '8 min read',
    summary: 'Learn how dietary choices can mitigate risk factors and support management of blood glucose and cholesterol.',
    content: `Diet is one of the most powerful tools in managing chronic health conditions such as type 2 diabetes and hypertension.

**For Blood Sugar Control:**
- Prioritize low Glycemic Index (GI) foods.
- Pair carbohydrates with protein or healthy fats to blunt blood sugar spikes.

**For Cardiovascular Wellness:**
- Reduce dietary sodium intake.
- Increase Soluble Fiber (oat bran, lentils, flaxseed) which binds to dietary cholesterol and aids clearance.
- Emphasize Omega-3 fatty acids from wild salmon, walnuts, and chia seeds to reduce systemic inflammation.`,
    tags: ['Diabetes', 'Heart Health', 'Medical Nutrition']
  },
  {
    title: 'Navigating Dietary Restrictions: Vegan, Keto & Gluten-Free',
    category: 'Dietary Restrictions',
    readTime: '5 min read',
    summary: 'Ensure nutritional completeness while adhering to specialized eating plans or food sensitivities.',
    content: `Whether due to food allergies, ethical choices, or lifestyle preferences, restrictive diets require careful planning to avoid micronutrient deficiencies.

- **Plant-Based / Vegan**: Ensure adequate intake of Vitamin B12, Iron, Zinc, and complete proteins by combining legumes with whole grains.
- **Gluten-Free**: Replace wheat with naturally gluten-free alternatives like quinoa, buckwheat, millet, and oats labeled certified gluten-free.
- **Keto / Low-Carb**: Focus on high-quality unsaturated fats and leafy greens while monitoring electrolyte levels (sodium, potassium, magnesium).`,
    tags: ['Vegan', 'Keto', 'Gluten-Free']
  }
];

router.get('/', (req, res) => {
  const { category, search } = req.query;
  let filtered = articles;

  if (category && category !== 'all') {
    filtered = filtered.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.summary.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json(filtered);
});

module.exports = router;
