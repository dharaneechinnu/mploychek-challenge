# MPloyChek – Role-Based Records Portal

A simple web application where users log in and see records based on their role.

**Tech Stack:** Angular 19, Angular Material, TypeScript, Node.js, Express, MongoDB, Mongoose.

### Basic Flow

```text
Login
 ↓
Angular
 ↓
Express API
 ↓
JWT Authentication
 ↓
MongoDB
 ↓
Check User Role
 ↓
Show Allowed Records
```

### Features

- Login using **User ID, Password and Role**.
- Passwords are secured using **bcrypt**.
- JWT is used for authentication.
- **General Users** can see public records.
- **Admins** can see public + admin-only records.
- Admins can **add, edit, view and delete users**.
- Admins cannot delete or demote themselves.
- Records API supports a simulated delay for testing loading states.
- UI shows **spinner and skeleton loading** while data is loading.

### Main API Flow

```text
Angular Component
      ↓
Angular Service
      ↓
Express Route
      ↓
Controller
      ↓
Mongoose
      ↓
MongoDB
```

### Main APIs

```text
POST   /api/auth/login
GET    /api/users/me
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/records
```

### Demo Users

```text
Admin:
admin / admin123

General User:
user / user123
```

**Main concept:**  
**Login → JWT → Role Check → API → MongoDB → Role-based Records**

**Screenshots:**
<img width="1842" height="1017" alt="image" src="https://github.com/user-attachments/assets/5b1a01a5-893a-4c2e-81aa-aa9c494000bd" />
<img width="1848" height="1011" a<img width="1836" height="1008" alt="image" src="https://github.com/user-attachments/assets/2b4cca93-5c8e-463b-aec8-5a9b862ef43f" />
<img width="1836" height="1008" alt="image" src="https://github.com/user-attachments/assets/8d0eb7ec-e88c-4722-86f0-91268df3577f" />
