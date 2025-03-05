# JWT Authentication with Angular and Node.js

This project demonstrates a **JWT-based authentication system** using:
- **Angular** for the frontend.
- **Node.js** (with Express) for the backend.
- **MySQL/MariaDB** for the database.

## Features
- User registration and login.
- JWT token generation and validation.
- Protected routes that require a valid JWT token.
- Clean and responsive UI using Angular Material.

## Create a database named jwt_auth in MySQL/MariaDB.

Run the following SQL query to create the users table:

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) DEFAULT NULL
);

## Usage
- Register: Navigate to /register and create a new account.
- Login: Navigate to /login and enter your credentials to receive a JWT token.
- Protected Route: Access /protected to view protected content (requires a valid JWT token).
