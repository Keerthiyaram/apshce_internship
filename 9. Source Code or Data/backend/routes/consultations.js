const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Mock database of certified nutritionists
const professionals = [
  {
    id: 'prof-1',
    name: 'Dr. Sarah Jenkins, RD, CDE',
    specialty: 'Clinical Nutrition & Diabetes Management',
    experience: '12+ Years Experience',
    rating: 4.9,
    bio: 'Specializing in glycemic control, metabolic health, and personalized meal planning for medical health conditions.',
    availability: 'Available Mon-Fri',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a93a407338?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'prof-2',
    name: 'Marcus Vance, MS, CSCS',
    specialty: 'Sports Performance & Muscle Building',
    experience: '9+ Years Experience',
    rating: 4.8,
    bio: 'Dedicated to helping athletes and bodybuilders optimize caloric surplus, macro timing, and body composition.',
    availability: 'Available Tue-Sat',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'prof-3',
    name: 'Priya Sharma, MPH, RDN',
    specialty: 'Plant-Based & Weight Loss Management',
    experience: '8+ Years Experience',
    rating: 4.9,
    bio: 'Passionate about sustainable weight management, vegan/vegetarian nutrition, and mindful intuitive eating.',
    availability: 'Available Mon-Thu',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
  }
];

// In-memory store for consultation requests
let consultationRequests = [
  {
    id: 'req-101',
    userId: 'sample-user-id',
    profName: 'Dr. Sarah Jenkins, RD, CDE',
    topic: 'Dietary Adjustments for Prediabetes',
    message: 'Hello Dr. Jenkins, I would like guidance on managing carbohydrate intake to improve fasting glucose levels.',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  }
];

// Get list of professionals
router.get('/professionals', (req, res) => {
  res.json(professionals);
});

// Get user consultation requests
router.get('/my-requests', auth, (req, res) => {
  const userReqs = consultationRequests.filter(r => r.userId === req.user.userId || r.userId === 'sample-user-id');
  res.json(userReqs);
});

// Book consultation / submit query
router.post('/book', auth, (req, res) => {
  const { professionalId, topic, message } = req.body;
  const prof = professionals.find(p => p.id === professionalId);

  if (!prof) {
    return res.status(404).json({ message: 'Professional not found' });
  }

  const newRequest = {
    id: `req-${Date.now()}`,
    userId: req.user.userId,
    profName: prof.name,
    topic: topic || 'General Nutrition Consultation',
    message,
    status: 'Pending Review',
    createdAt: new Date().toISOString()
  };

  consultationRequests.unshift(newRequest);
  res.status(201).json({ message: 'Consultation request submitted successfully!', request: newRequest });
});

module.exports = router;
