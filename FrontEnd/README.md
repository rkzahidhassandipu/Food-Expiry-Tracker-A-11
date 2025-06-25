# 🥫 Food Expiry Tracker System

## 🔗 Live Site
[https://assignment11-d0983.web.app/](https://assignment11-d0983.web.app/)

---

## 📘 Project Overview

**Food Expiry Tracker System** is a full-stack web application that helps users track their food inventory and receive alerts about expiring items. It aims to reduce food waste by allowing users to add, manage, update, and monitor food with expiry dates.

This project demonstrates secure full-stack development using Firebase authentication, MongoDB, JWT authorization, CRUD operations, dynamic routing, protected routes, and real-time expiry tracking with countdowns.

---

## 🚀 Key Features

### ✅ Authentication
- Email/Password Authentication via Firebase
- Google Login (OAuth)
- User information shown in Navbar after login
- Redirect handling for protected routes

### 🧑‍🍳 Pages and Features
- **Home Page**
  - Banner Slider (Framer Motion)
  - Nearly Expiry Items Section (Items expiring in next 5 days)
  - Expired Items Section
  - Extra Sections: Food Preservation Tips, Expiry FAQs

- **Fridge Page**
  - All food items (paginated)
  - Search + Filter (by category)
  - Expired Badge
  - "See Details" Button

- **Add Food Page**
  - Private route
  - Add food items with all necessary fields
  - Auto-capture user email and added date

- **My Items Page**
  - Private route
  - Table view of user’s added food items
  - Update and Delete (modal confirmation)

- **Food Details Page**
  - Full food info with image
  - Add Note (only by item owner)
  - Expiry Countdown
  - Posted Notes visible

- **404 Page**
  - Custom Not Found route for invalid paths

- **Others**
  - Responsive Design (mobile/tablet/desktop)
  - Toast notifications for success/error
  - Loading Spinner during fetch
  - Environment variable protection for Firebase & MongoDB
  - JWT Secured API endpoints
  - CountUp stats for expired & nearly expiry items

---

## 🧰 Technologies Used

### 🔧 Frontend:
- React.js
- React Router DOM
- Firebase Auth
- Tailwind CSS
- Framer Motion
- React Toastify
- React CountUp
- React Hook Form
- DaisyUI / Flowbite (optional)

### 🌐 Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Cookie-parser
- dotenv
- CORS

---

## 🔐 Environment Variables

### Frontend:
