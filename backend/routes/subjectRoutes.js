import express from "express";
const router = express.Router();
import { addSubject, getAllSubjects, getSingleSubject, updateSubject, deleteSubject } from "../controllers/subjectController.js";

// Add Subject
router.post("/", addSubject);

// Get All Subjects
router.get("/", getAllSubjects);

// Get Single Subject
router.get("/:id", getSingleSubject);

// Update Subject
router.put("/:id", updateSubject);

// Delete Subject
router.delete("/:id", deleteSubject);

export default router;