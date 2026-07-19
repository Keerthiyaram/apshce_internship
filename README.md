# Nutrition Assistant App

A comprehensive nutrition tracking and meal planning application built with React, Node.js, Express, MongoDB, and Prisma.

## Features

- **User Authentication**: Register and login with secure JWT authentication
- **Dashboard**: View daily nutrition progress with visual progress bars
- **Meal Logging**: Log meals with detailed nutritional information
- **Food Database**: Browse and search extensive food database with nutritional info
- **Recipes**: Discover healthy recipes with cooking instructions
- **Profile Management**: Update personal info and get personalized nutrition goals
- **Calorie & Macro Tracking**: Track calories, protein, carbs, and fat intake
- **Personalized Recommendations**: Get recipe suggestions based on dietary preferences

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- Prisma ORM
- MongoDB
- JWT Authentication
- bcryptjs

## Prerequisites

- Node.js (v16 or above)
- npm (v8 or above)
- MongoDB Atlas account (or local MongoDB installation)
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nutrition
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

1. **Backend Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URL=mongodb+srv://your_username:your_password@cluster0.rf8tvaj.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

   **Note**: The MongoDB URL is already configured with your provided connection string.

2. **Prisma Setup**
   
   Navigate to the backend directory:
   ```bash
   cd backend
   ```

   Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

   Push the schema to MongoDB:
   ```bash
   npx prisma db push
   ```

   Seed the database with initial food and recipe data:
   ```bash
   node prisma/seed.js
   ```

## Running the Application

### Option 1: Run Both Frontend and Backend Together

From the root directory:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000) concurrently.

### Option 2: Run Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Meals
- `GET /api/meals` - Get all user meals
- `POST /api/meals` - Create new meal
- `GET /api/meals/daily-log` - Get daily nutrition log
- `PUT /api/meals/daily-log` - Update daily log
- `DELETE /api/meals/:id` - Delete meal

### Foods
- `GET /api/foods` - Get all foods (with optional search/category filters)
- `GET /api/foods/:id` - Get food by ID
- `POST /api/foods` - Add new food

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/goals` - Get personalized nutrition goals

### Recipes
- `GET /api/recipes` - Get all recipes (with optional filters)
- `GET /api/recipes/:id` - Get recipe by ID
- `GET /api/recipes/recommendations/:userId` - Get personalized recommendations

## Database Schema

The application uses MongoDB with the following main models:

- **User**: Stores user information, dietary preferences, and goals
- **Food**: Nutritional information for various foods
- **Meal**: User's logged meals with food items
- **DailyLog**: Daily nutrition tracking
- **Recipe**: Healthy recipes with ingredients and instructions

## Development

### Prisma Studio
To view and edit your database data:
```bash
cd backend
npx prisma studio
```

### Adding New Foods
You can add new foods through the API or directly seed them in `prisma/seed.js`.

### Adding New Recipes
Add new recipes in `prisma/seed.js` and run the seed script.

## Project Structure

```
nutrition/
├── backend/
│   ├── config/
│   │   └── database.js          # Prisma client configuration
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.js              # Seed data
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── foods.js             # Food database routes
│   │   ├── meals.js             # Meal logging routes
│   │   ├── recipes.js           # Recipe routes
│   │   └── users.js             # User profile routes
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── context/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── FoodDatabase.js
│   │   │   ├── Login.js
│   │   │   ├── MealLogging.js
│   │   │   ├── Profile.js
│   │   │   ├── Recipes.js
│   │   │   └── Register.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## Team Members

- **T Charan Teja Pillutla** - Member
- **Dinesh Kumar Chanduri** - Member
- **Manem Devi Sravya** - Team Lead
- **Injamuri Yaswanth Kumar** - Member
- **Yaram Keerthi** - Member

## License

MIT

## Notes

- This application is for educational purposes and should complement, not replace, professional medical or dietary advice.
- Users are encouraged to consult qualified healthcare providers for personalized recommendations.
- The MongoDB connection string is pre-configured with the provided credentials.
