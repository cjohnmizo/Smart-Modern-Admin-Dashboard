# Smart Modern Admin Dashboard

![App Screenshot](/dashboard-preview.png)

A modern, full-stack admin dashboard built with **Next.js 15**, **MongoDB**, and **Tailwind CSS**. it features a premium UI with glassmorphism effects, dark mode support, and secure authentication.

🚀 **Live Demo:** [Here](https://smad-cjohnmizo.vercel.app/)

## ✨ Features

- **🔐 Secure Authentication**: 
  - JWT-based auth with HTTP-only cookies.
  - Zod validation for robust input checking.
  - Protected API routes and middleware.
- **📊 Interactive Dashboard**: 
  - Real-time statistics and data visualization using Recharts.
  - Recent activity tracking.
- **📝 Todo Management**: 
  - Full CRUD operations.
  - Priority levels (High, Medium, Low) and due dates.
- **bust User Management**: 
  - Admin controls for viewing and managing users.
  - Role-based access control (Admin/User).
- **🎨 Premium UI/UX**: 
  - Fully responsive design.
  - Dark/Light mode toggle.
  - Smooth animations with Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn/ui, Framer Motion, Recharts, Lucide Icons.
- **Backend**: Next.js API Routes (Serverless), Mongoose, JWT, Zod.
- **Database**: MongoDB.
- **language**: TypeScript.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/cjohnmizo/Smart-Modern-Admin-Dashboard.git
    cd Smart-Modern-Admin-Dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secure_jwt_secret_key_here
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and receive HttpOnly cookie.

### Todos
- `GET /api/todos` - Get all todos for logged-in user.
- `POST /api/todos` - Create a new todo.
- `PUT /api/todos/[id]` - Update a todo.
- `DELETE /api/todos/[id]` - Delete a todo.

## 📸 Screenshots

*(Add your screenshots here)*

---
Developed by [C. John](https://github.com/cjohnmizo)
