# SkillConnect

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Description

SkillConnect is a MERN stack platform that connects users with local service providers and skilled workers. Users can search, filter, and book services seamlessly, while providers can manage their profiles and offerings.

## Tech Stack

- **Frontend**: React (with Vite), Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT

## Features

- User authentication with JWT
- Role-based access control (User / Provider)
- Search and filter services by category, location, etc.
- Booking system for services
- Responsive UI for mobile and desktop
- REST API integration

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/skillconnect.git
    cd skillconnect/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` folder with the following variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/skillconnect
    JWT_SECRET=your_jwt_secret_here
    ```

4. Start the server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` folder:
    ```
    VITE_API_URL=http://localhost:5000/api
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillconnect
JWT_SECRET=your_jwt_secret_here
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

- `POST /api/auth/login` - User login
- `GET /api/services` - Fetch all services
- `POST /api/bookings` - Create a booking
- `GET /api/providers` - Fetch providers (for admins/providers)

## Screenshots

- Placeholder for homepage screenshot
- Placeholder for service search page
- Placeholder for booking confirmation

## Deployment

- **Backend**: Deploy to Render (connect to MongoDB Atlas)
- **Frontend**: Deploy to Vercel (set environment variables)

## Future Improvements

- Add payment integration (Stripe)
- Implement real-time chat between users and providers
- Add review and rating system
- Mobile app development

## Author

- **Name**: Prince Kumar Choudhary 
- **Email**: princekumarchoudhary22@gmail.com