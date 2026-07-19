# Solution Requirements Specification

## 1. Functional Requirements

### 1.1 Authentication & Authorization
*   **FR-1.1.1:** The system shall allow users to register using an email and password.
*   **FR-1.1.2:** The system shall capture user metrics during registration: Age, Weight, Height, Gender, Activity Level, Goals, and Dietary Restrictions.
*   **FR-1.1.3:** The system shall calculate Baseline Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on registration data.
*   **FR-1.1.4:** The system shall restrict access to the dashboard, meals, and profile routes to authenticated users only (JWT validation).

### 1.2 Dashboard & Tracking
*   **FR-1.2.1:** The dashboard shall display a daily summary of consumed calories, protein, carbohydrates, and fats against the calculated daily targets.
*   **FR-1.2.2:** The system shall allow users to log food items into categorized meals (Breakfast, Lunch, Dinner, Snacks).
*   **FR-1.2.3:** The system shall allow users to create and save custom meals (recipes) for quick logging.

### 1.3 Recipe Recommendations
*   **FR-1.3.1:** The system shall provide recipe suggestions based on a user's remaining daily macro requirements.
*   **FR-1.3.2:** Recipe suggestions must filter out ingredients listed in the user's dietary restrictions (e.g., Vegan, Gluten-Free).

---

## 2. Non-Functional Requirements (NFRs)

### 2.1 Performance
*   **NFR-2.1.1 (Latency):** 95% of API requests for logging a meal must complete within 200 milliseconds.
*   **NFR-2.1.2 (Time to Interactive):** The frontend application must achieve a Time to Interactive (TTI) of under 2.0 seconds on a standard 4G mobile connection.

### 2.2 Usability & Accessibility
*   **NFR-2.2.1 (Responsive Design):** The user interface must be fully responsive, supporting mobile devices (minimum width 320px) up to large desktop monitors.
*   **NFR-2.2.2 (Accessibility):** The application shall meet WCAG 2.1 Level AA compliance, ensuring screen reader compatibility and sufficient color contrast.

### 2.3 Security & Data Privacy
*   **NFR-2.3.1 (Encryption):** All user passwords must be hashed using bcrypt with a minimum work factor of 10.
*   **NFR-2.3.2 (Transit):** All client-server communication must occur over TLS 1.2 or higher (HTTPS).
*   **NFR-2.3.3 (Data Isolation):** User data must be strictly isolated via Row-Level Security policies or application-level tenant isolation, ensuring a user can only access their own logs.