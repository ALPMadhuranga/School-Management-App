import cors from "cors";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';
import studentRoutes from "./routes/studentRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import allocateSubjectRoutes from "./routes/allocateSubjectRoutes.js";
import allocateClassroomRoutes from "./routes/allocateClassroomRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { protect } from "./middleware/authMiddleware.js"
import path from "path";

dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Define port
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


// API Routes
app.use('/api/students', protect, studentRoutes);
app.use('/api/classrooms', protect, classroomRoutes);
app.use('/api/teachers', protect, teacherRoutes);
app.use('/api/subjects', protect, subjectRoutes);
app.use('/api/allocate-subjects', protect, allocateSubjectRoutes);
app.use('/api/allocate-classrooms', protect, allocateClassroomRoutes);
app.use('/api/users', userRoutes);


// Serve static files from the frontend build directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Serve frontend index.html for any route not handled by API
app.get("*", (req, res) => {
  res.send(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});