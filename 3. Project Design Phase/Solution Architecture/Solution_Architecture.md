# Solution Architecture

The Nutrition Assistant application follows a modern client-server architecture with decoupled frontend and backend services.

## High-Level Architecture

- **Client Application**: A Single Page Application (SPA) built using React.js. It manages its own routing and global state (using Context API).
- **Backend API**: A RESTful API built with Node.js and Express.js, handling business logic, authentication, and database interactions.
- **Data Layer**: A relational database, interfaced via Prisma ORM for type-safe database queries.

## Frontend Architecture

The React frontend is structured into several key directories:
- `src/components/`: Reusable UI components (e.g., `Navbar.js` which manages navigation and active route styling).
- `src/pages/`: Top-level route components (e.g., `Login.js`, `Register.js`, which handle forms and user input).
- `src/context/`: Global state management. Specifically, `AuthContext.js` handles user session data, login, and logout functionalities across the app.

### State Management
We use the **React Context API** for global state. 
- The `useAuth` hook provides the current `user` object and authentication methods (`login`, `register`, `logout`) to any component in the tree, allowing components like `Navbar` to conditionally render links based on authentication status.

### Component Design
Forms (like in `Register.js`) use controlled components with local React state (`useState`) to manage complex user inputs including multiple dietary restrictions, body metrics, and goals.

## Data Flow (Authentication Example)

1. User enters credentials in the `Login` or `Register` component.
2. Component calls `login(email, password)` or `register(formData)` from `AuthContext`.
3. `AuthContext` makes an asynchronous HTTP request to the Backend API.
4. Backend verifies credentials and returns a session token or user object.
5. `AuthContext` updates the global `user` state.
6. The `Navbar` component automatically re-renders to show authenticated links (Dashboard, Profile, etc.).
7. The `Login` component triggers a programmatic navigation (`useNavigate`) to the `/dashboard`.