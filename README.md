# Smart Modern Admin Dashboard

A modern, full-stack admin dashboard built with Next.js, MongoDB, and Tailwind CSS.

🚀 **Live Demo:** [https://smad-cjohnmizo.vercel.app/](https://smad-cjohnmizo.vercel.app/)

## Features

- **Authentication**: Secure Login and Registration system with JWT.
- **Dashboard**: Interactive charts and statistics.
- **Todo List**: Full CRUD functionality with priorities and due dates.
- **User Management**: Admin controls for managing users.
- **Responsive Design**: Works on all devices.

## Tech Stack

- **Frontend**: Next.js 15+, React, Tailwind CSS, Shadcn/ui.
- **Backend**: Next.js API Routes (Serverless).
- **Database**: MongoDB (via Mongoose).
- **Authentication**: JSON Web Tokens (JWT).

## Getting Started

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
    JWT_SECRET=your_jwt_secret
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

## Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add `MONGO_URI` and `JWT_SECRET` in Vercel's **Environment Variables** settings.
4.  Deploy!
