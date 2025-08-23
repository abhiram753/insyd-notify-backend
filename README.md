# Insyd Notification Backend

This is the backend service for the Insyd Notification Proof of Concept (POC).  
It is built with **Node.js, Express, and SQLite**.

## 🚀 Features
- Stores notifications in SQLite.
- REST API to create and fetch notifications.
- Health check endpoint.
- Lightweight, designed for a startup scale (100 DAUs), but can scale up.

---

## 📡 API Endpoints

### Health Check
`GET /api/health` → returns `{ ok: true }`

### List Notifications
`GET /api/notifications/:userId` → list all notifications for a user

### Create Notification
`POST /api/notifications` → create a new notification  
Body example:
```json
{
  "userId": "testuser",
  "type": "like",
  "content": "Someone liked your post!"
}

🛠 Setup & Run Locally
npm install
npm run dev


The server runs at http://localhost:4000

📂 Tech Stack

Node.js
Express
SQLite