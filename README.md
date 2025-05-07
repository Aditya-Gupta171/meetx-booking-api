# MeetX Activity Booking API

A robust RESTful API for managing activity bookings, built with Node.js, Express, and MongoDB Atlas.

---

## 🚀 Features

- **User Registration & Login** (JWT authentication, 1-hour expiry)
- **Public Activity Listing** (title, description, location, date & time)
- **Book Activities** (authenticated users only)
- **View Your Bookings**
- **Input Validation** (express-validator)
- **Password Hashing** (bcrypt)
- **Clean Code Structure** (routes, controllers, models)
- **Security** (helmet, CORS)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** JWT
- **Validation:** express-validator
- **Security:** bcrypt, helmet

---

## 📦 Folder Structure

```
src/
  config/        # Configuration files
  controllers/   # Route controllers
  middleware/    # Custom middleware
  models/        # Database models
  routes/        # API routes
  utils/         # Utility functions
  server.js      # Express app entry point
.env             # Environment variables
.gitignore
package.json
README.md
```

---

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Aditya-Gupta171/meetx-booking-api.git
cd meetx-booking-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1h
```

### 4. Start the server

```bash
npm run dev
```

The API will be running at [http://localhost:5000](http://localhost:5000)

---

## 🧪 How to Test with Postman

1. **Import the included Postman collection** (or create your own).
2. **Register a new user** via `/api/auth/register`.
3. **Login** via `/api/auth/login` to get your JWT token.
4. **For protected endpoints**, add this header:
   ```
   Authorization: Bearer <your_token>
   ```
5. **Create activities** (optional, for testing).
6. **Book an activity** and **view your bookings**.

---

## 📚 API Endpoints & Examples

### Auth

- **Register**
  - `POST /api/auth/register`
  - Request:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phoneNumber": "9876543210",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "token": "JWT_TOKEN",
      "user": {
        "id": "USER_ID",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phoneNumber": "9876543210"
      }
    }
    ```

- **Login**
  - `POST /api/auth/login`
  - Request:
    ```json
    {
      "email": "jane@example.com",
      "password": "password123"
    }
    ```
  - Response: Same as above

---

### Activities

- **List all activities**
  - `GET /api/activities`
  - Response:
    ```json
    {
      "success": true,
      "count": 2,
      "data": [
        {
          "_id": "ACTIVITY_ID",
          "title": "Cricket Match",
          "description": "T20 match between India and Australia",
          "location": "Mumbai Stadium",
          "dateTime": "2023-12-20T15:00:00.000Z"
        }
      ]
    }
    ```

- **Get activity by ID**
  - `GET /api/activities/:id`

- **Create activity** (auth required)
  - `POST /api/activities`
  - Request:
    ```json
    {
      "title": "Football Tournament",
      "description": "Annual corporate football tournament",
      "location": "Andheri Sports Complex",
      "dateTime": "2023-12-25T09:00:00.000Z"
    }
    ```

---

### Bookings

- **Book an activity** (auth required)
  - `POST /api/bookings`
  - Request:
    ```json
    {
      "activityId": "ACTIVITY_ID"
    }
    ```

- **Get my bookings** (auth required)
  - `GET /api/bookings`
  - Response:
    ```json
    {
      "success": true,
      "count": 1,
      "data": [
        {
          "_id": "BOOKING_ID",
          "user": "USER_ID",
          "activity": {
            "_id": "ACTIVITY_ID",
            "title": "Cricket Match",
            "description": "T20 match between India and Australia",
            "location": "Mumbai Stadium",
            "dateTime": "2023-12-20T15:00:00.000Z"
          },
          "status": "confirmed"
        }
      ]
    }
    ```
