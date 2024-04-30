import asyncHandler from "express-async-handler";
import { AllocateClassroom } from "../models/allocateClassroomModel.js";
import { Teacher } from "../models/teacherModel.js";
import { Classroom } from "../models/classroomModel.js";
import mongoose from "mongoose";

// Add AllocateClassroom
export const addAllocateClassroom = asyncHandler(async (req, res) => {
  try {
    const { teacher, classroom } = req.body;

    // check that fields are empty or not
    if (!teacher || !classroom) {
      return res.status(400).send({ message: "All fields are required" });
    }

    //check classroom and teacher exist on database
    const existClassroom = await Classroom.findById(classroom);
    const existTeacher = await Teacher.findById(teacher);

    if (!existClassroom || !existTeacher) {
      return res
        .status(400)
        .send({ message: "Classroom or Teacher not found" });
    }

    //crate record
    const allocateClassroom = await AllocateClassroom.create({
      teacher,
      classroom,
    });
    res.status(200).json(allocateClassroom);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      return res.status(400).send({
        message:
          "Duplicate error: Teacher and Classroom combination already exists",
      });
    } else {
      // Other errors, pass to the global error handler
      res.status(400).json(error);
    }
  }
});

// Get All AllocateClassrooms
export const getAllocateClassrooms = asyncHandler(async (req, res) => {
  try {
    const allocateClassroom = await AllocateClassroom.aggregate([
      {
        $lookup: {
          from: "teachers",
          localField: "teacher",
          foreignField: "_id",
          as: "teacher",
        },
      },
      {
        $unwind: {
          path: "$teacher",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "classrooms",
          localField: "classroom",
          foreignField: "_id",
          as: "classroom",
        },
      },
      {
        $unwind: {
          path: "$classroom",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          teacher: {
            firstName: 1,
            lastName: 1,
          },
          classroom: {
            classroomName: 1,
          },
        },
      },
      {
        $sort: {
          teacher: 1,
        },
      },
    ]);

    // If no allocateSubject found
    if (allocateClassroom.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.json(allocateClassroom);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Delete AllocateClassroom
export const deleteAllocateClassroom = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Allocate Classroom Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Allocate Classroom ID" });
    }

    // Check if addAllocate Classroom exists
    const ExistAllocateClassroom = await AllocateClassroom.findById(id);
    if (!ExistAllocateClassroom) {
      res.status(400).send({ message: "No data available" });
    }

    // Delete record
    await AllocateClassroom.findByIdAndDelete(id);

    res.status(200).json({ message: `Allocate Classroom deleted successfully: ${id}` });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
