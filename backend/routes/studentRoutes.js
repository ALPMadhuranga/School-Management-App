import express from "express";
const router = express.Router();

// Add Student
router.post("/", (req, res) => { 
    res.status(200).json({ message: "Create Student" });
});

// Get All Students
router.get("/", (req, res) => {
  res.status(200).json({ message: "Get Students" });
});

// Get A Student
router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get Student ${req.params.id}` });
});

// Update A Student
router.put("/:id", (req, res) => {
    res.status(200).json({ message: `Update Student ${req.params.id}` });
});

// Delete A Student
router.delete("/:id", (req, res) => {
    res.status(200).json({ message: `Delete Student ${req.params.id}` });
});

export default router;
