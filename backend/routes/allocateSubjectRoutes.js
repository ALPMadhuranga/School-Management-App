import express from "express";
const router = express.Router();

// Add Allocate-Subject
router.post("/", (req, res) => { 
    res.status(200).json({ message: "Create Allocate-Subject" });
});

// Get All Allocate-Subjects
router.get("/", (req, res) => {
  res.status(200).json({ message: "Get All Allocate-Subjects" });
});

// Get Single Allocate-Subject
router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get Single Allocate-Subject ${req.params.id}` });
});

// Update Allocate-Subject
router.put("/:id", (req, res) => {
    res.status(200).json({ message: `Update Allocate-Subject ${req.params.id}` });
});

// Delete Allocate-Subject
router.delete("/:id", (req, res) => {
    res.status(200).json({ message: `Delete Allocate-Subject ${req.params.id}` });
});

export default router;