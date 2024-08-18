# 🛠️ E-Commerce Site Backend

## 🚀 Overview
This repository contains the backend for a fully functional e-commerce platform. The backend is built with Node.js and Express.js, providing a robust and scalable solution for managing products, user authentication, orders, and other business logic. MongoDB is used as the database to store and manage data.

## 🧰 Tech Stack
- **Node.js** 🟢: JavaScript runtime for server-side programming.
- **Express.js** 🚂: Web framework for building RESTful APIs.
- **MongoDB** 🍃: NoSQL database for storing and managing data.
- **JWT** 🔐: JSON Web Tokens for secure user authentication.
- **Mongoose** 🐭: ODM (Object Data Modeling) library for MongoDB, facilitating data interaction.

## 📂 Folder Structure
```
/src
|-- controllers
|   |-- authController.js
|   |-- productController.js
|   |-- orderController.js
|-- models
|   |-- User.js
|   |-- Product.js
|   |-- Order.js
|-- routes
|   |-- authRoutes.js
|   |-- productRoutes.js
|   |-- orderRoutes.js
|-- middlewares
|   |-- authMiddleware.js
|-- utils
|-- config
|   |-- db.js
|-- server.js
```

## 📋 Key Features
- **User Authentication** 🔑: Manages user registration, login, and secure sessions using JWT (JSON Web Tokens).
- **Product Management** 🛍️: CRUD (Create, Read, Update, Delete) operations for managing product details in the database.
- **Order Processing** 📦: Handles order creation, updating, and tracking, with secure payment processing.
- **Secure API** 🛡️: Protected routes that ensure only authorized users can access certain functionalities.

## 🧪 How to Run the Backend
1. **Install Dependencies** 📦
   ```bash
   npm install
   ```
2. **Environment Variables** 🔧
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```
3. **Start the Server** ▶️
   ```bash
   npm start
   ```
4. **Testing the API** 🧪
   Use tools like Postman or Insomnia to test the API endpoints.

## 📌 API Endpoints
- **/api/auth** 🔑: Routes for user authentication (login, signup).
- **/api/products** 🛍️: Routes for managing products (view, add, update, delete).
- **/api/orders** 📦: Routes for order management (create, update, view).

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

