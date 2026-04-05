/*/ application code handled inside app.ts
import express from 'express'
import { config }  from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();
const app = express();

// middle wares of express to handle request
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
*/

import express from 'express';
import 'dotenv/config'; // ✅ ensure env loads everywhere
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// CORS (safe for dev, no silent failures)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Logging (dev only)
app.use(morgan("dev"));

// Root route (sanity check)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Main API routes
app.use("/api/v1", appRouter);

export default app;