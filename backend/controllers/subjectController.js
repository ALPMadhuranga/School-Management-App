import asyncHandler from "express-async-handler";

// Add Subject
export const addSubject = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Create A Subject" });
})

// Get All Subjects
export const getAllSubjects = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get All Subjects" });
})

// Get Single Subject
export const getSingleSubject = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get Single Subject ${req.params.id}` });
})

// Update Subject
export const updateSubject = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Subject ${req.params.id}` });
})

// Delete Subject
export const deleteSubject = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Subject ${req.params.id}` });
})