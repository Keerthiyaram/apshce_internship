# Nutrition Assistant - Comprehensive Testing Document

This document outlines the testing strategy, test cases, and test scenarios for the Nutrition Assistant application, based on the current implementation of the frontend components (Authentication, Navigation, etc.).

## 1. Unit & Component Testing

### 1.1 Login Component (`Login.js`)
| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| UT-LOG-01 | Render Login form with email and password inputs | Form renders successfully with empty inputs | Pending |
| UT-LOG-02 | Form validation - submit with empty fields | HTML5 `required` validation prevents submission | Pending |
| UT-LOG-03 | Successful login (Mock API) | `login` context function is called with correct credentials, navigates to `/dashboard` | Pending |
| UT-LOG-04 | Failed login (Mock API error) | Error message state is set and displayed in `.error` div | Pending |
| UT-LOG-05 | Loading state during submission | Button text changes to 'Signing in...' and is disabled | Pending |

### 1.2 Register Component (`Register.js`)
| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| UT-REG-01 | Render Register form with all input fields | Form renders successfully | Pending |
| UT-REG-02 | Input field updates | State updates correctly on typing (e.g., name, age, weight) | Pending |
| UT-REG-03 | Dietary Restrictions checkboxes | Toggling checkboxes correctly updates the `dietaryRestrictions` array in state | Pending |
| UT-REG-04 | Successful registration | `register` context function is called with form data, navigates to `/dashboard` | Pending |
| UT-REG-05 | Failed registration | Error message is displayed in `.error` div | Pending |

### 1.3 Navbar Component (`Navbar.js`)
| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| UT-NAV-01 | Render Navbar unauthenticated | Logo is visible, menu links (Dashboard, Meals, etc.) are hidden | Pending |
| UT-NAV-02 | Render Navbar authenticated | Menu links and Logout button are visible | Pending |
| UT-NAV-03 | Active link styling | Current path link has the `active` CSS class | Pending |
| UT-NAV-04 | Logout functionality | Clicking logout calls `logout()` from context and navigates to `/login` | Pending |

---

## 2. Integration Testing

### 2.1 Authentication Flow Integration
| Test ID | Scenario | Expected Result | Status |
|---|---|---|---|
| IT-AUTH-01 | Register -> Dashboard | User registers, auth context updates, navbar shows authenticated links | Pending |
| IT-AUTH-02 | Login -> Dashboard | User logs in, auth context updates, user is redirected to dashboard | Pending |
| IT-AUTH-03 | Logout -> Login | User clicks logout, auth state clears, redirected to login, navbar links hide | Pending |

---

## 3. End-to-End (E2E) Testing (e.g., Cypress / Playwright)

### 3.1 User Onboarding (Registration)
- **Pre-condition:** User is not authenticated.
- **Steps:**
  1. Navigate to `/register`
  2. Fill out Full Name, Email, Password.
  3. Fill out Body Metrics: Age (25), Weight (70), Height (175).
  4. Select Gender, Activity Level, and Goal.
  5. Select Dietary Restrictions (e.g., 'vegan', 'gluten-free').
  6. Click "Create Account".
- **Expected Outcome:** User is redirected to `/dashboard`. Navbar displays authenticated state. Profile data is saved in backend.

### 3.2 User Authentication (Login)
- **Pre-condition:** User account exists.
- **Steps:**
  1. Navigate to `/login`
  2. Enter valid Email and Password.
  3. Click "Sign In".
- **Expected Outcome:** User is redirected to `/dashboard`. User session is established.

### 3.3 Navigation Validation
- **Pre-condition:** User is authenticated and on `/dashboard`.
- **Steps:**
  1. Click on "Meals" in Navbar. -> Verify URL is `/meals` and link is active.
  2. Click on "Foods" in Navbar. -> Verify URL is `/foods` and link is active.
  3. Click on "Recipes" in Navbar. -> Verify URL is `/recipes` and link is active.
  4. Click on "Logout". -> Verify URL is `/login` and Navbar menu is hidden.

---

## 4. Performance & Accessibility Testing

- **Lighthouse Scores:** Target > 90 for Performance, Accessibility, and Best Practices.
- **Form Accessibility:** Ensure all inputs in `Login.js` and `Register.js` have proper associated `<label>` tags (Currently verified).
- **Responsive Design:** Verify Navbar collapses to a hamburger menu on mobile (Check `Navbar.css` implementation) and Auth cards adapt to smaller screens.