# AI-Driven Full Stack HR Core System

This repository contains the completed MERN Stack application for the AI308B ESE Examination.

## Features
- **Frontend**: React + Vite, aesthetic premium design with Vanilla CSS (Glassmorphism, animations).
- **Backend**: Node.js + Express, RESTful APIs, Error Handling Middleware.
- **Database**: MongoDB (Mongoose Schema, Validation).
- **Authentication**: JWT & bcrypt for secure login/signup.
- **AI Integration**: OpenRouter API to analyze employee performance and provide actionable insights.

## Directory Structure
- `/frontend` - React application.
- `/backend` - Express backend.
- `/docs` - Contains the final Project Report Template to export for PDF submission.
- `render.yaml` - Blueprint for automated Render deployment.

## Running Locally

1. **Backend**:
   ```bash
   cd backend
   npm install
   node server.js
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Render Deployment
Simply connect this GitHub repository to your Render account and use the provided `render.yaml` as the blueprint, or deploy the Web Services manually point to `backend/` and `frontend/` folders. Make sure to add `MONGO_URI`, `JWT_SECRET`, and `OPENROUTER_API_KEY` to the Backend's Environment Variables in the Render dashboard.
