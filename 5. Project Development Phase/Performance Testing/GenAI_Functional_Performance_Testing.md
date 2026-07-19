# Performance & Functional Testing Strategy

This document defines the performance benchmarks and functional testing criteria to ensure the Nutrition Assistant is robust, scalable, and provides a seamless user experience.

## 1. Performance Benchmarks

### 1.1 Backend / API Latency
*   **Authentication Endpoints (`/api/auth/*`)**: Target < 300ms. Password hashing via bcrypt is computationally heavy; acceptable delay.
*   **Data Retrieval (`/api/logs/daily`)**: Target < 150ms. Essential for the Dashboard to load instantly. Database indexing on `user_id` and `date` is required.
*   **External API Queries (Food Search)**: Target < 800ms. This relies on external services (e.g., Edamam) and is the most likely bottleneck. Implement Redis caching to drop this to < 50ms for cached queries.

### 1.2 Frontend Performance (Lighthouse Metrics)
*   **First Contentful Paint (FCP)**: < 1.0s.
*   **Time to Interactive (TTI)**: < 1.5s on desktop, < 2.5s on mobile (3G/4G).
*   **Cumulative Layout Shift (CLS)**: < 0.1. Ensure dashboard rings don't jump around as data loads.
*   *Optimization Strategy*: Code splitting via React.lazy for routes (Recipes, Guides) to minimize the initial JS bundle size.

### 1.3 Load Testing Criteria
*   **Scenario**: 1000 concurrent users logging in, fetching their dashboard, and logging a single food item over a 5-minute window.
*   **Tool**: Artillery or k6.
*   **Pass Criteria**: 0% error rate (HTTP 500s), and 95th percentile response time remains under 500ms.

## 2. Functional Testing Automation

### 2.1 Unit Testing (Jest)
*   **Macro Calculation Logic**: Ensure the TDEE math is accurate given various edge-case inputs (extreme height/weight).
*   **Component Rendering**: Ensure `Navbar.js` hides/shows links correctly based on mocked `AuthContext` state.

### 2.2 End-to-End Testing (Cypress)
*   **The "Golden Path"**: Automated script that registers a new user, completes onboarding, logs 3 meals, checks the dashboard totals, and logs out.
*   **Form Validation**: Script attempts to submit `Register.js` with missing fields, invalid emails, and mismatched passwords, verifying that the UI prevents submission and shows the correct `.error` messages.