import asyncHandler from "express-async-handler";

// Add Classroom
export const addClassroom = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Create Classroom" });
})

// Get All Classrooms
export const getAllClassrooms = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get All Classrooms" });
})

// Get Single Classroom
export const getSingleClassroom = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get Single Classroom ${req.params.id}` });
})

// Update Classroom
export const updateClassroom = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Classroom ${req.params.id}` });
})

// Delete Classroom
export const deleteClassroom = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Classroom ${req.params.id}` });
})