# Project Demonstration Script & Flow

This document serves as the official script and presentation flow for demonstrating the Nutrition Assistant application to stakeholders and potential investors.

## Demonstration Setup
*   **Environment**: Staging Server (Ensure database has been seeded with standard food items and recipes).
*   **Pre-requisite**: Have two browser windows ready. One logged in as an existing active user (to show a populated dashboard), and one in incognito mode (to show the onboarding flow).

---

## Part 1: The Introduction (2 minutes)
**Speaker Notes**: "Welcome to the Nutrition Assistant. Today, we're going to show you how we are removing the friction from diet tracking. Instead of forcing users to do complex math at the end of the day, our platform acts as a digital nutritionist."

## Part 2: The Onboarding Experience (3 minutes)
**Action**: Switch to Incognito window. Navigate to `/register`.
**Demonstration**: 
1.  Fill out the registration form. Emphasize the collection of detailed metrics (Age, Weight, Activity Level).
2.  Select "Lose Weight" and check the "Vegan" dietary restriction.
3.  Click "Create Account".
**Speaker Notes**: "Notice how we immediately calculate the user's Total Daily Energy Expenditure (TDEE). There's no guesswork. By capturing dietary restrictions now, the app curates the entire experience automatically."

## Part 3: The Daily Dashboard (3 minutes)
**Action**: Switch to the pre-logged-in browser window (Active User). Navigate to `/dashboard`.
**Demonstration**: 
1.  Highlight the visual rings representing Calories, Protein, Carbs, and Fats.
2.  Show that breakfast and lunch are already logged.
**Speaker Notes**: "This is the core loop. It's highly visual and gamified. The user instantly knows they have 600 calories and exactly 45 grams of protein left for the day."

## Part 4: Frictionless Logging & Intelligence (4 minutes)
**Action**: Navigate to `/meals` and then `/recipes`.
**Demonstration**: 
1.  **Meals**: Show the "Quick Log" feature by adding a 200-calorie snack instantly. Notice the dashboard rings update in real-time.
2.  **Recipes (The "Aha!" Moment)**: Go to the Recipes tab. 
**Speaker Notes**: "Here is the magic. The user has 400 calories left. Instead of making them search the database, our engine automatically suggests three dinners that perfectly fit their remaining macros, and because they selected 'Vegan' at onboarding, all suggestions are plant-based."

## Part 5: The Ecosystem (2 minutes)
**Action**: Briefly click through `/education` and `/consultations`.
**Demonstration**: Show the layout of the guides and the interface to book a professional.
**Speaker Notes**: "When users hit a plateau, they don't churn. They utilize our educational hub or book a consultation with a certified dietitian directly through the platform."

## Part 6: Q&A and Roadmap (1 minute)
**Speaker Notes**: "Thank you. We are currently preparing for our mobile release which will include Barcode Scanning and Apple Health integration. We'd love to take your questions."