const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 4000;
const db = new sqlite3.Database("./insyd.sqlite");

app.use(cors());
app.use(express.json());

// Create notifications table if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    type TEXT,
    content TEXT,
    isRead INTEGER DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date() });
});

// List notifications for a user
app.get("/api/notifications/:userId", (req, res) => {
  db.all("SELECT * FROM notifications WHERE userId = ? ORDER BY timestamp DESC",
    [req.params.userId],
    (err, rows) => {
      if (err) res.status(500).json({ error: err });
      else res.json(rows);
    });
});

// Create a notification
app.post("/api/notifications", (req, res) => {
  const { userId, type, content } = req.body;
  db.run("INSERT INTO notifications (userId, type, content) VALUES (?, ?, ?)",
    [userId, type, content],
    function(err) {
      if (err) res.status(500).json({ error: err });
      else res.json({ id: this.lastID });
    });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
