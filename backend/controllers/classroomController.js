import asyncHandler from "express-async-handler";
import { Classroom } from "../models/classroomModel.js";
import mongoose from "mongoose";

// Add Classroom
export const addClassroom = asyncHandler(async (req, res) => {
  try {
    const { className } = req.body;

    // Check if className field is empty
    if (!className) {
      return res.status(400).send({ message: "Classroom name is required" });
    }

    // Check if classroom already exists in the database
    const existingClassroom = await Classroom.findOne({ className });
    if (existingClassroom) {
      return res.status(400).send({ message: "Classroom already exists" });
    }

    // Create a new classroom record
    const classroom = await Classroom.create({
      className,
    });

    res.status(200).json(classroom);
  } catch (error) {
    res.status(400).json(error);
  }
  // res.status(200).json({ message: "Create Classroom" });
});

// Get All Classrooms
export const getAllClassrooms = asyncHandler(async (req, res) => {
  try {
    const classroom = await Classroom.find({});

    // If no classroom found
    if (classroom.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    // Get all classroom
    return res.status(200).json({
      count: classroom.length,
      data: classroom,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
  // res.status(200).json({ message: "Get All Classrooms" });
});

// Get One Classroom
export const getSingleClassroom = asyncHandler(async (req, res) => {
  try {
    //get classroom id from url
    const { id } = req.params;

    // Classroom Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid classroom ID" });
    }
    const classroom = await Classroom.findById(id);

    //check classroom exist on database
    if (!classroom) {
      return res.status(404).send({ message: "Classroom not found" });
    }

    // Get single classroom
    res.status(200).json(classroom);
  } catch (error) {
    res.status(400).json(error);
  }
  // res.status(200).json({ message: `Get Single Classroom ${req.params.id}` });
});

// Update Classroom
export const updateClassroom = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { className } = req.body;

    // Check if all required fields are provided
    if (!className) {
      return res.status(400).send({ message: "Classroom name is required" });
    }

    // Classroom Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid classroom ID" });
    }

    // update record
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      id,
      {
        className,
      },
      { new: true }
    );

    if (!updateClassroom) {
      return res.status(404).send({ message: "Classroom not found" });
    }

    res.status(200).json(updatedClassroom);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }

  //   res.status(200).json({ message: `Update Classroom ${req.params.id}` });
});

//Disable classroom record
export const disableClassroom = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
    
        // Classroom Id (ObjectId) validate
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid classroom ID" });
        }
    
        const classroom = await Classroom.findById(id);
    
        //check classroom available
        if (!classroom) {
          res.status(400).send({ message: "No data available" });
        }
        await Classroom.findByIdAndUpdate(id, { status: "inactive" }, { new: true });

        res.status(200).send({ message: `(${id}): record disabled successfully` });
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
//   res.status(200).json({ message: `Disable Classroom ${req.params.id}` });
});

//Enable classroom record
export const enableClassroom = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
    
        // Classroom Id (ObjectId) validate
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid classroom ID" });
        }
    
        const classroom = await Classroom.findById(id);
    
        //check classroom available
        if (!classroom) {
          res.status(400).send({ message: "No data available" });
        }
        await Classroom.findByIdAndUpdate(id, { status: "active" }, { new: true });

        res.status(200).send({ message: `(${id}): record enabled successfully` });
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
//   res.status(200).json({ message: `Enable Classroom ${req.params.id}` });
});

// Delete Classroom
export const deleteClassroom = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
    
        // Classroom Id (ObjectId) validate
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid classroom ID" });
        }
    
        // Check if classroom exists
        const classroom = await Classroom.findById(id);
        if (!classroom) {
          res.status(400).send({ message: "No data available" });
        }
    
        // Delete record
        await Classroom.findByIdAndDelete(id);
        res.status(200).json({ message: `Classroom deleted successfully: ${id}` });
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal Server Error" });
      }

//   res.status(200).json({ message: `Delete Classroom ${req.params.id}` });
});
