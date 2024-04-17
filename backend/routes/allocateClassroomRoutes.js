import express from "express";
const router = express.Router();

// Add Allocate-Classroom
router.post("/", (req, res) => { 
    res.status(200).json({ message: "Create Allocate-Classroom" });
});

// Get All Allocate-Classrooms
router.get("/", (req, res) => {
  res.status(200).json({ message: "Get All Allocate-Classrooms" });
});

// Delete Allocate-Classroom
router.delete("/:id", (req, res) => {
    res.status(200).json({ message: `Delete Allocate-Classroom ${req.params.id}` });
});

export default router;