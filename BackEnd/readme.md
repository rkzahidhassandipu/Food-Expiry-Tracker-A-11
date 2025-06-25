# 🍱 Food Expiry Tracker – Backend

This is the **backend API** for the Food Expiry Tracker web application. It provides RESTful endpoints to manage food data, user-specific access, and comment features using **Node.js**, **Express**, **MongoDB**, **JWT**, and **Firebase Admin SDK**.

---

## 🌐 Live API URL

> ℹ️ Replace this with your deployed API URL if applicable:  
`https://your-backend-api.vercel.app`

---

## 📦 Features

- 🔐 JWT-based cookie authentication.
- ✅ Firebase Admin token verification for secure routes.
- 🧊 CRUD operations on food items.
- 💬 Comment system.
- 🔍 Food search functionality.
- 📧 Email-based user access filtering.

---


---

## ⚙️ Technologies Used

- Node.js
- Express.js
- MongoDB (native driver)
- Firebase Admin SDK
- JSON Web Token (JWT)
- Cookie-parser
- dotenv
- CORS

---

## 🔐 Authentication

- **JWT**: Token is generated at `/jwt`, stored in `httpOnly` cookie.
- **Firebase**: `verifyFirebaseToken` middleware checks ID tokens from Firebase Auth.

---

## 🔗 API Endpoints

### ✅ Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/jwt` | Generates JWT and stores in a cookie |

---

### 🧊 Food Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/fridge` | Get all food items |
| GET | `/fridgeFood?search=` | Search food items by title |
| GET | `/fridgeFood/:id` | Get single food item by ID |
| GET | `/fridgeEmail?email=` | Get items by user email (Firebase Protected) |
| POST | `/FoodExpiry` | Add a new food item (JWT Protected) |
| PATCH | `/fridge/:id` | Update a food item (JWT Protected) |
| DELETE | `/fridgeFood/:id` | Delete a food item (JWT Protected) |

---

### 💬 Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/comments` | Get all comments |
| POST | `/comments` | Post a new comment (JWT Protected) |

---
