🔔 insyd-notify-backend — Notification API (Node + Express + SQLite)

A lightweight notification backend for the Insyd POC.
It exposes REST endpoints to create and fetch user notifications, and is deployed on Render.

🌍 Live API base: https://insyd-notify-backend.onrender.com

✅ Health: GET /api/health

📬 Sample data: GET /api/notifications/testuser

🧭 At-a-glance (YAML)
project:
  name: insyd-notify-backend
  description: >
    Node.js + Express + SQLite service that creates and fetches user
    notifications. Designed as a simple POC for Insyd.
  status: live
  links:
    repo: "https://github.com/abhiram753/insyd-notify-backend"
    health: "https://insyd-notify-backend.onrender.com/api/health"
    sample_notifications: "https://insyd-notify-backend.onrender.com/api/notifications/testuser"

tech_stack:
  runtime: Node.js
  framework: Express
  database: SQLite (file: ./insyd.sqlite)
  deployment: Render (Web Service)

api_endpoints:
  - method: GET
    path: /api/health
    purpose: Health check
  - method: GET
    path: /api/notifications/{userId}
    purpose: List notifications for a user
  - method: POST
    path: /api/notifications
    purpose: Create a notification

scripts:
  dev: nodemon src/server.js
  start: node src/server.js

notes:
  - Root "/" intentionally returns "Cannot GET /". Use "/api/*" routes.
  - No auth; CORS enabled for POC simplicity.

✨ Features

🔹 Minimal REST API using Express

🔹 SQLite database (auto-creates table on boot)

🔹 Simple schema: userId, type, content, isRead, timestamp

🔹 CORS enabled (so a separate frontend can call it)

🔹 Deployed on Render with npm start

📦 Project Structure
insyd-notify-backend/
├─ src/
│  └─ server.js         # Express app + routes + SQLite bootstrap
├─ insyd.sqlite         # SQLite DB file (auto-created)
├─ package.json
└─ README.md

🛠 Local Setup

Prereqs: Node.js 18+ (20+ recommended), npm

# 1) Clone
git clone https://github.com/abhiram753/insyd-notify-backend.git
cd insyd-notify-backend

# 2) Install deps
npm install

# 3) Run (dev: with auto-restart)
npm run dev
# or production
# npm start


Server listens on http://localhost:4000 (or PORT if set).

On first run, SQLite file ./insyd.sqlite is created and the notifications table is ensured.

Environment variables (optional):

Name	Default	Purpose
PORT	4000	Port for the HTTP server
🗃 Database Schema

The table is created automatically on boot:

CREATE TABLE IF NOT EXISTS notifications (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  userId    TEXT,
  type      TEXT,
  content   TEXT,
  isRead    INTEGER DEFAULT 0,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);


isRead: 0 = unread, 1 = read

timestamp: server-side CURRENT_TIMESTAMP

📚 API Reference
1) Health

GET /api/health
200 OK

{ "ok": true, "time": "2025-08-22T10:30:01.234Z" }

2) List Notifications

GET /api/notifications/:userId

200 OK

[
  {
    "id": 6,
    "userId": "testuser",
    "type": "custom",
    "content": "dddd",
    "isRead": 0,
    "timestamp": "2025-08-22 10:21:09"
  }
]

3) Create Notification

POST /api/notifications
Body

{
  "userId": "testuser",
  "type": "like",
  "content": "Someone liked your post!"
}


200 OK

{ "id": 7 }

🧪 Quick Testing
cURL
# Health
curl -s https://insyd-notify-backend.onrender.com/api/health

# Create
curl -s -X POST https://insyd-notify-backend.onrender.com/api/notifications \
  -H "Content-Type: application/json" \
  -d '{"userId":"testuser","type":"info","content":"Hello from curl"}'

# List
curl -s https://insyd-notify-backend.onrender.com/api/notifications/testuser

PowerShell (Windows)
# Create
Invoke-RestMethod `
  -Uri "https://insyd-notify-backend.onrender.com/api/notifications" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{ "userId": "testuser", "type": "info", "content": "Hello from PS" }'

# List
Invoke-RestMethod `
  -Uri "https://insyd-notify-backend.onrender.com/api/notifications/testuser" `
  -Method GET

🚀 Deployment (Render)

Service type: Web Service
Build command: npm install
Start command: npm start

Tips:

If you hit native module issues with sqlite3, do a clean build (remove node_modules, reinstall) so Render builds the correct Linux binary.

You can pin Node by adding a .node-version file (e.g., 20.x) if needed.

🧩 Design Notes & Limitations

No auth or user verification (POC only). Any userId can be used.

No rate limiting or spam controls.

SQLite is perfect for demos and small DAU; for production, migrate to a managed DB (e.g., Postgres).

The root path / will show Cannot GET / — this is expected. Only /api/* routes are served.

🛠 Troubleshooting

Cannot GET /
You’re hitting the root path. Use /api/health or /api/notifications/:userId.

502 / long cold start on Render (Free)
The instance may be waking up. Retry; check Logs in Render.

sqlite3 ... invalid ELF header during deploy
Caused by incompatible native binary. Fix by ensuring a clean install on Render (no prebuilt binaries from Windows/macOS).
Typical remedy: push repo without node_modules, let Render run npm install in Linux.

🔮 Roadmap (nice-to-have)

Mark notifications read/unread endpoints

Delete notifications

WebSocket push for real-time updates

User auth + rate limiting + per-user preferences

Switch to Postgres/Mongo for scale

👤 Author

Abhiram
GitHub: @abhiram753

📄 License

MIT — do whatever you want; attribution appreciated.

💡 If you’re pairing this with the Vercel frontend, point it at
https://insyd-notify-backend.onrender.com/api.
