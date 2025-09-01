📖 About the Project

This is a full-stack web application for discovering, searching, and saving recipes.
The app integrates with the Spoonacular API for recipe data and provides a user authentication system with login and registration.

Users can:

- Search for recipes by keyword or filters

- Save favorite recipes to their profile (stored in database)

- Register & log in securely (password hashing with bcrypt)

- Enjoy a responsive UI built with modern frontend tools

⚙️ Tech Stack

Frontend:

React (Hooks, functional components)

React Router

Tailwind CSS for styling

Fetch API for backend communication

Backend:

Node.js & Express.js

REST API endpoints for authentication & recipe management

MongoDB Atlas + Mongoose for data persistence

Deployment:

GitHub → for version control & CI/CD

Render → for backend & frontend hosting

MongoDB Atlas → cloud database

🚀 Features

- Secure user authentication (JWT + bcrypt)

- Error handling with proper status codes

- API data fetching with loading states

- Favorites saved per user (MongoDB relations)

- Full deployment pipeline with GitHub → Render

- Local development setup with .env configuration

## What I Learned

Working on this project helped me improve both technical and practical skills:

Full-Stack Development → connecting React frontend with Express backend and MongoDB

REST API Design → creating reusable endpoints for auth and data fetching

Authentication & Security → implementing JWT tokens and password hashing

Environment Configuration → handling .env locally and in deployment

Deployment & Hosting → using Render for hosting backend/frontend and MongoDB Atlas for database

Debugging & Problem Solving → fixing connection issues, CORS, and API errors

Version Control & Team Skills → using GitHub for tracking changes and preparing CI/CD


🌍 Deployment

Backend deployed on Render → https://spoonacular-1q2v.onrender.com/

Frontend deployed on Render → https://spoonacular-frontend.onrender.com/

Database hosted on MongoDB Atlas

## Next Steps ---

Add unit/integration tests (Jest, Supertest)

Improve error messages & form validation

Optimize frontend performance

Learn & implement CI/CD pipeline (GitHub Actions → automatic deploy on push)

Explore AWS deployment alternatives
