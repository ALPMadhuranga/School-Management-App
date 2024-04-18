import express from "express";
const router = express.Router();
import { addAllocateSubject, getAllocateSubjects, getAllocateSubject, updateAllocateSubject, deleteAllocateSubject } from "../controllers/allocateSubjectController.js";

// Add Allocate-Subject
router.post("/", addAllocateSubject);

// Get All Allocate-Subjects
router.get("/", getAllocateSubjects);

// Get Single Allocate-Subject
router.get("/:id", getAllocateSubject);

// Update Allocate-Subject
router.put("/:id", updateAllocateSubject);

// Delete Allocate-Subject
router.delete("/:id", deleteAllocateSubject);

export default router;