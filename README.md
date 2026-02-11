# Role-Based Task Management System (MERN Stack)

## 📌 Project Overview

This project is a MERN Stack application developed as part of a Machine Test for MERN Stack Developer.

The application allows an **Admin** to:
- Log in securely using JWT authentication
- Create and manage Agents
- Upload CSV files containing task data
- Automatically distribute tasks equally among agents

Agents can:
- Log in securely
- View only the tasks assigned to them

The system implements proper validation, role-based access control, and clean modular code structure.

---

## 🚀 Tech Stack

- **MongoDB** – Database
- **Express.js** – Backend framework
- **Node.js** – Runtime environment
- **React.js** – Frontend framework
- **JWT** – Authentication
- **Bcrypt** – Password hashing
- **Multer / CSV Parser** – File upload handling

---

## ✨ Features

### 🔐 Authentication
- JWT-based login
- Password hashing using bcrypt
- Role-based route protection
- Proper error handling for invalid login

### 👤 Agent Management (Admin Only)
- Create agents with:
  - Name
  - Email
  - Mobile number (with country code)
  - Password
- Secure storage of agent credentials

### 📂 CSV Upload & Distribution
- Accepts only:
  - `.csv`
  - `.xlsx`
  - `.xls`
- Validates correct file structure:
  - `firstName` (Text)
  - `phone` (Number)
  - `notes` (Text)
- Distributes tasks equally among 5 agents
- If tasks are not divisible evenly, remaining tasks are distributed sequentially
- Stores distributed tasks in MongoDB

### 🧑‍💼 Admin Dashboard
- Add agents
- Upload files
- View distributed tasks

### 🧑‍💻 Agent Dashboard
- View only assigned tasks
- No access to admin functionality

---

## 📁 Folder Structure
role-based-task-manager/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── .env.example
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ └── package.json
│
├── .gitignore
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
https://github.com/logicscienc/role-based-task-manager
```
Backend Setup
cd backend
npm install


Create a .env file inside the backend folder using the example file:

cp .env.example .env


Add the following variables:

PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


Start the backend server:

npm run dev

💻 Frontend Setup
cd frontend
npm install
npm start


The frontend will run on:

http://localhost:3000

🔐 Environment Variables

Create a .env file in the backend directory and include:

PORT=4000
MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_secret_key



Task Distribution Logic

Tasks are distributed equally among 5 agents.

Example:

25 tasks → 5 tasks per agent

27 tasks → First 2 agents get 6 tasks, remaining 3 get 5 tasks each

Ensures fair and sequential allocation.

API Endpoints Overview
| Method | Endpoint               | Access | Description               |
| ------ | ---------------------- | ------ | ------------------------- |
| POST   | /api/v1/auth/login     | Public | User login                |
| POST   | /api/v1/agents/create  | Admin  | Create agent              |
| GET    | /api/v1/agents         | Admin  | Get all agents            |
| POST   | /api/v1/tasks/upload   | Admin  | Upload CSV and distribute |
| GET    | /api/v1/tasks/my-tasks | Agent  | Get agent-specific tasks  |


🎥 Demo Video

Watch the complete working demo here:

 https://www.loom.com/share/d0efbe21e6494ff8896458b36ed34ce2

The demo covers:

Backend startup

Frontend login

Admin functionality

Agent functionality

CSV upload and validation

Task distribution logic

MongoDB database verification

🛡 Validation & Error Handling

Required field validation

Invalid login handling

Protected routes using JWT middleware

File type validation

Role-based access restriction

Proper HTTP status codes




