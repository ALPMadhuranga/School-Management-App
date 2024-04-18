import express from "express";
const router = express.Router();
import { addStudent, getAllStudents, getSingleStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";

// Add Student
router.post("/", addStudent);

// Get All Students
router.get("/", getAllStudents);

// Get Single Student
router.get("/:id", getSingleStudent);

// Update Student
router.put("/:id", updateStudent);

// Delete Student
router.delete("/:id", deleteStudent);

export default router;
