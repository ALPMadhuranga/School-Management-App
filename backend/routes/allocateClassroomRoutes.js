import express from "express";
const router = express.Router();
import { addAllocateClassroom, getAllocateClassrooms, deleteAllocateClassroom } from "../controllers/allocateClassroomController.js";

// Add Allocate-Classroom
router.post("/", addAllocateClassroom);

// Get All Allocate-Classrooms
router.get("/", getAllocateClassrooms);

// Delete Allocate-Classroom
router.delete("/:id", deleteAllocateClassroom);

export default router;