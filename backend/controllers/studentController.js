import asyncHandler from "express-async-handler";

// Add Student
export const addStudent = asyncHandler(async (req, res) => {
    console.log(req.body)

    res.status(200).json({ message: "Create Student" });
})

// Get All Students
export const getAllStudents = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get All Students" });
})

// Get Single Student
export const getSingleStudent = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get Student ${req.params.id}` });
})

// Update Student
export const updateStudent = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Student ${req.params.id}` });
})

// Delete Student
export const deleteStudent = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Student ${req.params.id}` });
})