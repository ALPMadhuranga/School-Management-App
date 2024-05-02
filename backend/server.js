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

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for handling CORS POLICY
const corsOptions = {
    origin: "https://school-management-system-rouge.vercel.app/",
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack School management system');
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