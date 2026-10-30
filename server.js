import "dotenv/config";
import express from "express";
import cors from "cors";

import config from "./config/config.js";

import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Welcome endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    application: "UniSphere",
    message: "University Management System API",
    status: "Running",
    version: "1.0.0"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "UniSphere backend is working properly",
    environment: config.environment
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/courses", courseRoutes);

// Error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Start server
app.listen(config.port, () => {
  console.log("------------------------------------");
  console.log("       UNISPHERE BACKEND");
  console.log("------------------------------------");
  console.log(`Server: http://localhost:${config.port}`);
  console.log(`Environment: ${config.environment}`);
  console.log("------------------------------------");
});
