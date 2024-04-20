import express from "express";
const router = express.Router();
import { addTeacher, getAllTeachers, getSingleTeacher, updateTeacher, deleteTeacher, disableTeacher, enableTeacher } from "../controllers/teacherController.js";

// Add Teacher
router.post("/", addTeacher);

// Get All Teachers
router.get("/", getAllTeachers);

// Get Single Teacher
router.get("/:id", getSingleTeacher);

// Update Teacher
router.put("/:id", updateTeacher);

// Delete Teacher
router.delete("/:id", deleteTeacher);

// Disable Teacher
router.put("/disable/:id", disableTeacher);

// Enable Teacher
router.put("/enable/:id", enableTeacher);

export default router;