import cors from "cors";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import allocateSubjectRoutes from "./routes/allocateSubjectRoutes.js";
import allocateClassroomRoutes from "./routes/allocateClassroomRoutes.js";
import path from "path";

dotenv.config();

const _dirname = path.resolve();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve frontend
app.use(express.static(path.join(_dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.send(path.join(_dirname, "frontend", "build", "index.html"));
});

// EndPoints
app.use('/api/students', studentRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/allocate-subjects', allocateSubjectRoutes);
app.use('/api/allocate-classrooms', allocateClassroomRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})