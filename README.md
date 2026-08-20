# Spotter: Admin Dashboard Architecture

## Overview
The Spotter Admin Dashboard is a secure, role-based management interface designed to give administrators full control over platform content, exercise libraries, user metrics, and system configurations. It serves as the operational command center for the full-stack application.

## Frontend Implementation (React & Tailwind CSS)
- **Protected Route Access:** Guarded by client-side router checks ensuring only users with verified admin privileges can access the dashboard views.
- **Component Structure:** Modular layout featuring statistics cards, dynamic data tables, modal forms for content creation/editing, and real-time activity indicators.
- **Styling:** Built strictly within the dark-mode visual identity (`#000000` pitch-black background with `#007BFF` electric blue accents) using Tailwind CSS.
- **State Management:** Redux Toolkit handles asynchronous data fetching, local caching, and optimistic UI updates when modifying exercises or platform settings.

## Backend & API Integration (Node.js, Express & MongoDB)
- **Role-Based Access Control (RBAC) Middleware:** Intercepts API requests to verify user roles via JSON Web Tokens (JWT) before granting access to sensitive administrative endpoints.
- **CRUD Operations & Endpoints:**
  - **Exercise Library Management:** Secure endpoints to create, update, or remove exercises, target muscle mappings, and instructional guides.
  - **User & Content Moderation:** Endpoints to view active user statistics, manage account permissions, and oversee platform data integrity.
- **Database Schemas:** Optimized Mongoose schemas supporting efficient querying and relational data structures between admin operations and the core database.

## Related Repositories
* [backend Repository](https://github.com/YamanHamed/gym-guide-backend) .
