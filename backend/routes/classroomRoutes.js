import express from "express";
const router = express.Router();

// Add Classroom
router.post("/", (req, res) => { 
    res.status(200).json({ message: "Create Classroom" });
});

// Get All Classrooms
router.get("/", (req, res) => {
  res.status(200).json({ message: "Get All Classrooms" });
});

// Get Single Classroom
router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get Single Classroom ${req.params.id}` });
});

// Update Classroom
router.put("/:id", (req, res) => {
    res.status(200).json({ message: `Update Classroom ${req.params.id}` });
});

// Delete Classroom
router.delete("/:id", (req, res) => {
    res.status(200).json({ message: `Delete Classroom ${req.params.id}` });
});

export default router;