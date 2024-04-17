import express from "express";
const router = express.Router();

// Add Subject
router.post("/", (req, res) => { 
    res.status(200).json({ message: "Create Subject" });
});

// Get All Subjects
router.get("/", (req, res) => {
  res.status(200).json({ message: "Get All Subjects" });
});

// Get Single Subject
router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get Single Subject ${req.params.id}` });
});

// Update Subject
router.put("/:id", (req, res) => {
    res.status(200).json({ message: `Update Subject ${req.params.id}` });
});

// Delete Subject
router.delete("/:id", (req, res) => {
    res.status(200).json({ message: `Delete Subject ${req.params.id}` });
});

export default router;