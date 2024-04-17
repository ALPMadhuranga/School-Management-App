import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import allocateSubjectRoutes from "./routes/allocateSubjectRoutes.js";
import allocateClassroomRoutes from "./routes/allocateClassroomRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// EndPoints
app.use('/api/students', studentRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/allocate-subjects', allocateSubjectRoutes);
app.use('/api/allocate-classrooms', allocateClassroomRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})