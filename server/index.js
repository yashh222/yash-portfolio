import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

import contactRoute from "./routes/contact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:4321";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "20kb" }));

// serve the resume + any other public files at /files/*
app.use("/files", express.static(path.join(__dirname, "assets")));

// basic abuse protection on the write endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/contact", limiter, contactRoute);

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
