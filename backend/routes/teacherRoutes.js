import express from "express";
const router = express.Router();

// Add Teacher
router.post("/", (req, res) => { 
    res.status(200).json({ message: "Create Teacher" });
});

// Get All Teachers
router.get("/", (req, res) => {
  res.status(200).json({ message: "Get All Teachers" });
});

// Get Single Teacher
router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get Single Teacher ${req.params.id}` });
});

// Update Teacher
router.put("/:id", (req, res) => {
    res.status(200).json({ message: `Update Teacher ${req.params.id}` });
});

// Delete Teacher
router.delete("/:id", (req, res) => {
    res.status(200).json({ message: `Delete Teacher ${req.params.id}` });
});

export default router;