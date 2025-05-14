// backend/src/index.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import fileUpload from "express-fileupload";
import cron from "node-cron";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { clerkMiddleware } from "@clerk/express";

import { initializeSocket } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

dotenv.config();

// ─── ESMODULE __dirname HACK ───────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── APP & SERVER SETUP ───────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
initializeSocket(httpServer);

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../tmp"),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  })
);

// ─── CRON: CLEAN UP tmp/ EVERY HOUR ─────────────────────────────────────────
cron.schedule("0 * * * *", () => {
  const tmpDir = path.join(__dirname, "../tmp");
  if (fs.existsSync(tmpDir)) {
    fs.readdir(tmpDir, (err, files) => {
      if (!err) {
        files.forEach((file) => {
          fs.unlink(path.join(tmpDir, file), () => {});
        });
      }
    });
  }
});

// ─── API ROUTES ─────────────────────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// ─── SERVE FRONTEND in PRODUCTION ──────────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  // from backend/src → ../../frontend/dist
  const frontendDist = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// ─── GLOBAL ERROR HANDLER ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
});

// ─── START & CONNECT DB ───────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
