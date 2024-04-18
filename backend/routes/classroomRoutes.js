import express from "express";
const router = express.Router();
import { addClassroom, getAllClassrooms, getSingleClassroom, updateClassroom, deleteClassroom } from "../controllers/classroomController.js";

// Add Classroom
router.post("/", addClassroom);

// Get All Classrooms
router.get("/", getAllClassrooms);

// Get Single Classroom
router.get("/:id", getSingleClassroom);

// Update Classroom
router.put("/:id", updateClassroom);

// Delete Classroom
router.delete("/:id", deleteClassroom);

export default router;