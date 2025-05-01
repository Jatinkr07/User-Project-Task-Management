# TaskTrack - Project and Task Management Application

TaskTrack is a full-stack application for managing projects and tasks, built with React, Express, and MongoDB.

## Features

- User authentication (signup, login)
- Project management (create, view, update, delete)
- Task management with status tracking
- Responsive design for all devices

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management

### Backend
- Express.js
- MongoDB with Mongoose
- JWT authentication
- RESTful API design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd tasktrack
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   JWT_SECRET=your-secret-jwt-key
   MONGODB_URI=mongodb://localhost:27017/tasktracker
   ```

4. Start the development server
   ```
   # Start the backend server
   npm run server
   
   # In a separate terminal, start the frontend
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update current user

### Projects
- `GET /api/projects` - Get all projects for current user
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get a specific project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Tasks
- `GET /api/projects/:projectId/tasks` - Get all tasks for a project
- `POST /api/projects/:projectId/tasks` - Create a new task
- `GET /api/projects/:projectId/tasks/:taskId` - Get a specific task
- `PUT /api/projects/:projectId/tasks/:taskId` - Update a task
- `DELETE /api/projects/:projectId/tasks/:taskId` - Delete a task

## License

This project is licensed under the MIT License
