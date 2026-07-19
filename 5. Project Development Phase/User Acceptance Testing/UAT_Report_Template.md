# Nutrition Assistant - User Acceptance Testing (UAT) Report

**Tester Name**: 
**Date**: 
**Environment**: Staging / Pre-Production

## 1. Authentication & Onboarding

| Feature / Scenario | Expected Result | Actual Result | Pass/Fail | Notes |
|---------|-----------------|---------------|-----------|-------|
| **User Registration - Basic** | User fills mandatory fields (Name, Email, Password) and creates an account successfully. Redirects to `/dashboard`. | | | |
| **User Registration - Full Profile** | User enters all body metrics, goals, and selects multiple dietary restrictions. Profile is saved accurately. | | | |
| **Login - Valid Credentials** | Existing user logs in with valid email/password and accesses the dashboard. | | | |
| **Login - Invalid Credentials** | User enters incorrect password. Appropriate error message is shown. | | | |
| **Logout** | Authenticated user clicks 'Logout'. Session ends, user redirects to `/login`, and navbar updates. | | | |

## 2. Navigation & Dashboard

| Feature / Scenario | Expected Result | Actual Result | Pass/Fail | Notes |
|---------|-----------------|---------------|-----------|-------|
| **Navbar Visibility (Logged Out)** | Only the brand logo is visible. | | | |
| **Navbar Visibility (Logged In)** | All links (Dashboard, Meals, Foods, Recipes, Grocery, Guides, Consult, Profile) are visible. | | | |
| **Active Link Styling** | Clicking a navbar link highlights it as active (e.g., green accent) while on that page. | | | |
| **Protected Routes** | Attempting to access `/dashboard` or `/meals` while logged out redirects to `/login`. | | | |

## 3. Form Validations

| Feature / Scenario | Expected Result | Actual Result | Pass/Fail | Notes |
|---------|-----------------|---------------|-----------|-------|
| **Missing Email on Login** | Form prevents submission. | | | |
| **Missing Password on Register** | Form prevents submission. | | | |
| **Dietary Restrictions Toggle** | User can check and uncheck multiple restrictions (vegan, keto, etc.) successfully. | | | |

---
**Overall Sign-off**: 
**Signature**: 