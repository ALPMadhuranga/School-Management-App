import asyncHandler from "express-async-handler";

// Add AllocateClassroom
export const addAllocateClassroom = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Create A AllocateClassroom" });
})

// Get All AllocateClassrooms
export const getAllocateClassrooms = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get All AllocateClassrooms" });
})

// Delete AllocateClassroom
export const deleteAllocateClassroom = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete AllocateClassroom ${req.params.id}` });
})