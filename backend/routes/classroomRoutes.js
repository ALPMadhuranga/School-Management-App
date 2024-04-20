import express from "express";
const router = express.Router();
import { addClassroom, getAllClassrooms, getSingleClassroom, updateClassroom, deleteClassroom, disableClassroom, enableClassroom } from "../controllers/classroomController.js";

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

// Disable Classroom
router.put("/disable/:id", disableClassroom);

// Enable Classroom
router.put("/enable/:id", enableClassroom);

export default router;