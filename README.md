# 🥫 Food Expiry Tracker System

A full-stack web application to help users reduce food waste by tracking expiry dates of stored food items. Users can add, manage, and monitor their food inventory with countdowns, filters, and notes.

**🔗 Live Site:** [https://assignment11-d0983.web.app/](https://assignment11-d0983.web.app/)

---

## 📘 Project Overview

**Food Expiry Tracker System** is built using the MERN stack with Firebase for authentication. It includes secure JWT-protected APIs, dynamic routing, and user-specific data access. Designed to be responsive and intuitive, it helps users identify nearly expired or expired items and take timely action.

---

## 🚀 Key Features

- 🔐 **Firebase Authentication** (Email/Password & Google)
- ⚙️ **JWT Token Security** for protected API access
- 🧊 **CRUD Operations** for food item management
- 🕒 **Expiry Countdown** with alert UI
- 💬 **Notes & Comments** on each food item
- 🔍 **Search & Filter** by title and category
- 📅 **Expired/Nearly Expired Sections**
- 📈 **CountUp Stats**
- 🖼️ **Responsive UI** for all devices

---

## 🧑‍🍳 Pages Overview

### 🏠 Home
- Hero banner (Framer Motion)
- Sections for Expired & Nearly Expiring Foods
- Tips & FAQs

### ❄️ Fridge
- All food items paginated
- Search + filter by category
- Expired badge and quick view

### ➕ Add Food
- Form with fields: name, category, expiry date, etc.
- Automatically records user email and added date

### 📋 My Items
- Private route
- Table view of user’s food items
- Update & Delete (modal with confirmation)

### 📄 Food Details
- Full info with image
- Add/view notes
- Live countdown till expiry

### ❌ 404 Not Found
- Custom error page for invalid routes

---

## 🧰 Technologies Used

### Frontend
- React.js
- React Router DOM
- Tailwind CSS + DaisyUI / Flowbite
- Firebase Auth
- Framer Motion
- React Toastify
- React CountUp
- React Hook Form
- Axios
- SweetAlert2

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Firebase Admin SDK
- JSON Web Token (JWT)
- cookie-parser
- dotenv
- CORS

---

## 🔐 Environment Variables

### Frontend (`client/.env`)

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=assignment11-d0983.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=assignment11-d0983
VITE_FIREBASE_STORAGE_BUCKET=assignment11-d0983.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id

```

### Backend (server/.env)
```
PORT=5000
DB_USER=yourMongoUser
DB_PASS=yourMongoPassword
JWT_ACCESS_SECRET=yourJWTSecret
FB_SERVICE_KEY=yourFirebaseServiceKey_JSON
```

## 💻 How to Run Locally
### 1. Clone the Repository

```
git clone https://github.com/rkzahidhassandipu/Food-Expiry-Tracker-A-11.git
cd food-expiry-tracker
```

### 2. Setup Frontend

```
cd client
npm install
npm run dev
```

### 3. Setup Backend

```
cd server
npm install
npm run dev
```

## API Endpoints
### ✅ Auth
| Method | Endpoint | Description                        |
| ------ | -------- | ---------------------------------- |
| POST   | `/jwt`   | Generates JWT and stores in cookie |


### 🧊 Food Items
| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| GET    | `/fridge`             | Get all food items          |
| GET    | `/fridgeFood?search=` | Search by title             |
| GET    | `/fridgeFood/:id`     | Get item by ID              |
| GET    | `/fridgeEmail?email=` | Get user items (protected)  |
| POST   | `/FoodExpiry`         | Add item (JWT Protected)    |
| PATCH  | `/fridge/:id`         | Update item (JWT Protected) |
| DELETE | `/fridgeFood/:id`     | Delete item (JWT Protected) |



### 💬 Comments
| Method | Endpoint    | Description             |
| ------ | ----------- | ----------------------- |
| GET    | `/comments` | Fetch all comments      |
| POST   | `/comments` | Add new (JWT Protected) |


🙋‍♂️ Author
Raihan Uddin

💻 MERN Stack Developer | 🎨 Graphic Designer

📍 Based in Malaysia

📧 Email: rkrazzakhan01731@gmail.com


