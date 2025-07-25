# UnityEats Backend

This is the backend for the UnityEats project.

## Tech Stack
- Node.js (Express)
- MongoDB (Mongoose)
- JWT-based authentication
- Local file/image storage (uploads/)

## Structure
- `controllers/` - Route logic
- `middleware/` - Express middleware (auth, error handling)
- `models/` - Mongoose models
- `routes/` - Express route definitions
- `uploads/` - Local image storage
- `utils/` - Utility functions
- `app.js` - Main entry point

## Setup
1. Install dependencies: `npm install`
2. Create a `.env` file (see `.env.example`)
3. Run the server: `npm start` 