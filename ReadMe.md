# 🛒 Fullstack E-Commerce (Work in Progress)

Hey! 👋
This is a **full-stack e-commerce project** I’ve just started. The idea is to slowly build all the features you’d expect in a real online store — like user login, product listings, cart, checkout, and an admin dashboard.

I’ll build this step by step, learning as I go. I'm keeping both the **frontend** and **backend** in one repo, but in separate folders so it's easy to manage.

---

## 🚀 Project Structure

```
/ecommerce-fullstack
  /client   --> React frontend
  /server   --> Node.js + Express backend
```

Each part has its own dependencies, `.env` file, and runs independently.

---

## 🛠️ Tech Stack (so far)

### Backend:

* Node.js
* Express
* MongoDB

### Frontend:

* React
* Redux Toolkit
* React Router DOM

---

## ✅ First Steps (Done)

* [x] Initialized GitHub repo
* [x] Created project folder structure
* [x] Set up backend with basic Express server
* [x] Set up frontend with React and Vite

---

## 📦 What I’ll Add Next

Here’s the order I’m planning to build this project in:

1. **Basic API**: setup routes, controllers, database connection
2. **User Auth**: signup, login, logout, JWT
3. **Frontend Auth Pages**: login & signup forms with validation
4. **Product Model**: create, list, get single product
5. **Cart System**: add/remove items, quantity control
6. **Order System**: place order, view orders
7. **Admin Panel**: manage users/products/orders
8. **Styling**: make it look nice (with Tailwind maybe)
9. **Payment Integration** (Stripe or Razorpay)
10. **Deployment** (Render, Vercel, or Railway)

---

## ⚙️ Running the Project Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ecommerce-fullstack.git
cd ecommerce-fullstack
```

### 2. Setup backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder with your MongoDB URI and JWT secret.

Start the backend server:

```bash
npm run dev
```

### 3. Setup frontend

```bash
cd ../client
npm install
npm run dev
```

That’s it! The frontend should run at something like `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## 💬 Why I'm Doing This

I’m using this project to:

* Practice integrating backend and frontend
* Learn how to manage full-stack projects
* Understand real-world project structure
* Prepare for real developer work or freelance

---

## ✍️ Notes to Myself

* Keep commits clean and meaningful
* Build one small feature at a time
* Keep backend and frontend `.env` files separate

---
