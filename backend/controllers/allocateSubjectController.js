import asyncHandler from "express-async-handler";

// Add AllocateSubject
export const addAllocateSubject = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Create A AllocateSubject" });
})

// Get All AllocateSubjects
export const getAllocateSubjects = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get All AllocateSubjects" });
})

// Get Single AllocateSubject
export const getAllocateSubject = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get Single AllocateSubject ${req.params.id}` });
})

// Update AllocateSubject
export const updateAllocateSubject = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update AllocateSubject ${req.params.id}` });
})

// Delete AllocateSubject
export const deleteAllocateSubject = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete AllocateSubject ${req.params.id}` });
})