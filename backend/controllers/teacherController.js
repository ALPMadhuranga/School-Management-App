import asyncHandler from "express-async-handler";

// Add Teacher
export const addTeacher = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Create A Teacher" });
})

// Get All Teachers
export const getAllTeachers = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get All Teachers" });
})

// Get Single Teacher
export const getSingleTeacher = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get Single Teacher ${req.params.id}` });
})

// Update Teacher
export const updateTeacher = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Teacher ${req.params.id}` });
})

// Delete Teacher
export const deleteTeacher = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Teacher ${req.params.id}` });
})