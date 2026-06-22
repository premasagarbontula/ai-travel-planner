# AI Travel Planner

## Project Overview

AI Travel Planner is a full-stack web application that generates personalized travel itineraries using Generative AI. Users can create an account, generate AI-powered travel plans based on their destination, budget, trip duration, and interests, and manage their trips through an intuitive dashboard.

The application uses Google Gemini to create detailed day-by-day itineraries, recommend hotels, estimate trip budgets, and provide activity-specific travel insights.

---

## Features

### Authentication

- User Registration
- User Login
- Secure Logout
- Protected Routes
- JWT Authentication with HTTP-only Cookies

### Trip Management

- Generate AI-powered travel itineraries
- View all generated trips
- View detailed trip information
- Delete trips
- Edit trip preferences and regenerate itineraries

### AI-Powered Features

- Day-wise itinerary generation
- Budget estimation in INR
- Hotel recommendations
- Best time to visit each activity
- Practical travel tips for each activity

### UI/UX

- Responsive design
- Loading states
- Toast notifications
- Password visibility toggle
- Mobile-friendly navigation

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React Icons

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- express-validator

### AI

- Google Gemini 2.5 Flash API

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Why This Tech Stack?

### Next.js

Provides a modern React framework with excellent developer experience, routing, optimization, and deployment support.

### TypeScript

Improves maintainability, catches errors early, and provides better developer tooling.

### MongoDB

Flexible document-based storage that fits naturally with dynamic AI-generated itinerary data.

### Express.js

Lightweight backend framework that enables rapid API development.

### Gemini API

Capable of generating structured JSON responses for travel itineraries, hotel recommendations, and activity insights.

---

## Setup Instructions

### Local Setup

#### 1. Clone Repository

```bash
git clone <repository-url>
cd ai-travel-planner
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:3000

GEMINI_API_KEY=your_gemini_api_key
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### Production Deployment

#### Frontend (Vercel)

Configure:

```env
NEXT_PUBLIC_API_URL=https://ai-travel-planner-7liu.onrender.com
```

Deploy using Vercel.

#### Backend (Render)

Configure:

```env
PORT
MONGO_URI
JWT_SECRET
CLIENT_URL
GEMINI_API_KEY
```

Deploy using Render.

#### Database

MongoDB Atlas is used as the production database.

---

## High-Level Architecture

```text
User
  │
  ▼
Next.js Frontend
  │
  ▼
Express API
  │
  ├── Authentication Layer
  │
  ├── Trip Management APIs
  │
  ├── Gemini AI Service
  │
  ▼
MongoDB Atlas
```

### Flow

1. User submits travel preferences.
2. Backend validates request.
3. Gemini generates itinerary JSON.
4. Backend parses and validates AI response.
5. Trip data is stored in MongoDB.
6. Frontend displays generated itinerary.

---

## Authentication and Authorization

### Authentication

Authentication is implemented using JWT tokens.

Process:

1. User registers or logs in.
2. Backend generates a JWT token.
3. Token is stored in an HTTP-only cookie.
4. Cookie is automatically included in future requests.

### Authorization

Protected routes use authentication middleware to:

- Verify JWT token
- Identify current user
- Restrict access to user-owned trips

Users can only:

- View their own trips
- Delete their own trips
- Regenerate their own trips

---

## AI Agent Design and Purpose

The AI agent is responsible for generating structured travel plans.

### Inputs

- Destination
- Number of days
- Budget level
- User interests

### Outputs

- Estimated trip budget
- Day-by-day itinerary
- Activity schedules
- Best time for activities
- Travel tips
- Hotel recommendations

### Design Approach

Prompt engineering is used to ensure Gemini returns valid JSON instead of free-form text.

The backend validates and parses AI responses before storing them in the database.

---

## Custom Feature: Activity Insights

### What Was Built?

For every generated activity, the AI provides:

- Best Time to Visit
- Practical Travel Tip

Example:

```text
Visit Tokyo Skytree

Best Time:
Sunset

Travel Tip:
Book tickets online in advance.
```

### Why Was It Built?

Many travel planners tell users where to go but not when to go.

This feature helps users:

- Avoid crowds
- Improve travel experience
- Save time
- Make better planning decisions

### Engineering Value

This feature demonstrates:

- Creativity
- Practical problem solving
- AI-enhanced decision support

---

## Bonus Feature: Hotel Recommendations

The AI suggests:

- Budget Hotel
- Mid Range Hotel
- Luxury Hotel

Recommendations are generated based on:

- Destination
- Budget
- Traveler popularity

---

## Key Design Decisions and Trade-Offs

### JSON-Based AI Responses

**Decision:**
Require Gemini to return structured JSON.

**Benefit:**
Reliable parsing and storage.

**Trade-Off:**
Requires more prompt engineering.

---

### Cookie-Based Authentication

**Decision:**
Store JWT in HTTP-only cookies.

**Benefit:**
Improved security compared to localStorage.

**Trade-Off:**
Requires proper CORS configuration.

---

### MongoDB Document Model

**Decision:**
Store itinerary data directly as nested documents.

**Benefit:**
Simple querying and flexible schema.

**Trade-Off:**
Large itineraries increase document size.

---

### AI Regeneration Instead of Manual Editing

**Decision:**
Allow users to regenerate an itinerary rather than manually editing every activity.

**Benefit:**
Faster user experience and simpler implementation.

**Trade-Off:**
Users cannot edit individual itinerary items.

---

## Known Limitations

### AI Accuracy

Generated itineraries depend on AI responses and may occasionally contain inaccuracies.

### Budget Estimates

Budget estimates are approximate and assume departure from a major Indian city such as Hyderabad, Mumbai, Delhi, or Bengaluru.

Actual costs may vary based on:

- Travel dates
- Departure city
- Seasonal pricing
- Availability

### No Real-Time Booking Integration

The application does not currently integrate with:

- Flight booking providers
- Hotel booking APIs
- Live pricing services

### Limited Trip Editing

Users can regenerate an itinerary but cannot edit individual activities directly.

---

## Future Improvements

- Flight recommendation integration
- Real-time hotel pricing
- Weather-aware itinerary generation
- Trip sharing functionality
- Favorite destinations
- PDF itinerary export
- Multi-user collaboration
- Google Maps integration

---

## Author

Prema Sagar Bontula

Full Stack Developer

Built using Next.js, Node.js, MongoDB, TypeScript, and Google Gemini AI.
