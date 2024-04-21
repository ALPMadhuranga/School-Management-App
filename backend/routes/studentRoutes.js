import express from "express";
const router = express.Router();
import {
  addStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  disableStudent,
  enableStudent,
} from "../controllers/studentController.js";

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

// Disable Subject
router.put("/disable/:id", disableStudent);

// Enable Subject
router.put("/enable/:id", enableStudent);

export default router;
