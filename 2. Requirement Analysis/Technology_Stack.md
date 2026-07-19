# Technology Stack

To ensure a highly responsive, scalable, and maintainable application, the Nutrition Assistant utilizes a modern JavaScript-based tech stack (MERN stack variant).

## 1. Frontend Layer (Client-Side)

*   **Core Framework**: React.js (v18+) - Chosen for its component-based architecture and robust ecosystem.
*   **Routing**: React Router DOM (v6+) - For client-side routing, enabling a seamless Single Page Application (SPA) experience without page reloads.
*   **State Management**: React Context API - Used for global state like Authentication (`AuthContext`) and theme preferences. Local component state is handled via `useState` and `useReducer`.
*   **Styling**: Vanilla CSS with CSS Variables - We avoid heavy UI frameworks to ensure maximum customization, smaller bundle sizes, and the implementation of a bespoke, premium aesthetic (glassmorphism, CSS grid/flexbox layouts).
*   **Icons**: Lucide React - A clean, customizable icon library that perfectly fits the modern UI design.

## 2. Backend Layer (Server-Side)

*   **Runtime Environment**: Node.js - For building fast and scalable network applications using an event-driven, non-blocking I/O model.
*   **Web Framework**: Express.js - A minimal and flexible Node.js framework that provides a robust set of features for our REST API.
*   **Authentication**: JSON Web Tokens (JWT) - Stateless authentication strategy allowing secure transmission of user identity between client and server. Passwords secured via bcrypt.

## 3. Data Layer

*   **Database Engine**: PostgreSQL - A powerful, open-source object-relational database system chosen for its reliability and complex query capabilities (e.g., querying recipes based on multi-dimensional macro targets).
*   **ORM (Object Relational Mapper)**: Prisma - Next-generation Node.js and TypeScript ORM. Chosen for its intuitive data model, automated migrations, and type-safe database access which drastically reduces runtime errors.

## 4. Development & DevOps Tools

*   **Package Manager**: npm / yarn
*   **Version Control**: Git / GitHub
*   **Linting & Formatting**: ESLint and Prettier to enforce code style consistency.
*   **Testing**: 
    *   Jest (Unit testing utility functions)
    *   React Testing Library (Component testing)
    *   Cypress (End-to-End browser testing)