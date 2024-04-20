import express from "express";
const router = express.Router();
import { addSubject, getAllSubjects, getSingleSubject, updateSubject, deleteSubject, disableSubject, enableSubject } from "../controllers/subjectController.js";

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

// Disable Subject
router.put("/disable/:id", disableSubject);

// Enable Subject
router.put("/enable/:id", enableSubject);

export default router;