# Smart Modern Admin Dashboard

A premium, production-ready Full Stack Admin Dashboard built with **Next.js 14**, **Typescript**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Dashboard+Preview)

## 🚀 Features

- **Full Stack Architecture**: Separated Client (Next.js) and Server (Express) for scalability.
- **Authentication**: Secure JWT authentication with HttpOnly cookies support (configurable).
- **Interactive Dashboard**: Real-time visualization with Recharts and Framer Motion.
- **User Management**: Admin interface to manage users (CRUD operations).
- **Responsive Design**: Mobile-first approach with collapsible sidebar and drawers.
- **Dark Mode**: Built-in dark/light mode toggle with persistence.
- **Start Modern UI**: Glassmorphism effects, smooth animations, and Shadcn UI components.
- **To Do List**: Integrated task management with real-time updates and persistence.

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Shadcn UI, Framer Motion
- **State**: React Query (TanStack), Zustand
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, Bcrypt
- **Validation**: Zod

## 📂 Project Structure

```
/
├── client/         # Next.js Frontend
│   ├── src/
│   │   ├── app/    # App Router Pages
│   │   ├── components/ # Reusable Components
│   │   └── lib/    # Utilities & API Client
├── server/         # Express Backend
│   ├── src/
│   │   ├── config/ # DB Config
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-admin-dashboard.git
   cd smart-admin-dashboard
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Configure MONGO_URI in .env
   npm run dev
   ```

3. **Setup Client**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the App**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

### 🔑 Admin Access
The **first account** you register will automatically be assigned **Admin** privileges.

## 🚀 Deployment

### Frontend (Vercel)
1. Push `client` folder to GitHub.
2. Import project in Vercel.
3. Add Environment Variables (e.g., `NEXT_PUBLIC_API_URL`).
4. Deploy.

### Backend (Render/Railway)
1. Push `server` folder.
2. Create Web Service on Render/Railway.
3. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`).
4. Link to Frontend.

## 📄 License
MIT
