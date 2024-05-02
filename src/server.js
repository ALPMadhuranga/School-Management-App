import cors from "cors";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { errorHandler } from "../backend/middleware/errorMiddleware.js";
import connectDB from "../backend/config/db.js";
import studentRoutes from "../backend/routes/studentRoutes.js";
import classroomRoutes from "../backend/routes/classroomRoutes.js";
import teacherRoutes from "../backend/routes/teacherRoutes.js";
import subjectRoutes from "../backend/routes/subjectRoutes.js";
import allocateSubjectRoutes from "../backend/routes/allocateSubjectRoutes.js";
import allocateClassroomRoutes from "../backend/routes/allocateClassroomRoutes.js";
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
app.use(cors());

// Serve static files from the frontend build directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));

// Serve frontend index.html for any route not handled by API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/allocate-subjects', allocateSubjectRoutes);
app.use('/api/allocate-classrooms', allocateClassroomRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})