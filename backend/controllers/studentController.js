import asyncHandler from "express-async-handler";
import { Student } from "../models/studentModel.js";
import { Classroom } from "../models/classroomModel.js";
import mongoose from "mongoose";

// Add Student
export const addStudent = asyncHandler(async (req, res) => {
  try {
    // Destructure student details from request body
    const {
      firstName,
      lastName,
      contactPerson,
      contactNo,
      email,
      birthDate,
      classroom,
    } = req.body;

    // check that fields are not empty
    if (
      !firstName ||
      !lastName ||
      !contactPerson ||
      !contactNo ||
      !email ||
      !birthDate ||
      !classroom
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Email validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email address" });
    }

    //check email exist on database
    const existEmail = await Student.findOne({ email });
    if (existEmail) {
      return res.status(400).send({ message: "Email already exists" });
    }

    // Find the classroom by name
    const classroomDetails = await Classroom.findById(classroom);

    // If classroom not found, return an error
    if (!classroomDetails) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    // Create a new student
    const newStudent = await Student.create({
      firstName,
      lastName,
      contactPerson,
      contactNo,
      email,
      birthDate,
      classroom, // Assign the classroom ID to the student
    });

    // Respond with the saved student data
    res.status(201).json(newStudent);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error);
  }
});

// Get All Students
export const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Student.aggregate([
      {
        $match: { status: "active" },
      },
      {
        $lookup: {
          from: "classrooms",
          localField: "classroom",
          foreignField: "_id",
          as: "classroomDetails",
        },
      },
      {
        $unwind: {
          path: "$classroomDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          contactPerson: 1,
          contactNo: 1,
          email: 1,
          birthDate: 1,
          "classroomDetails.className": 1, // Include only the className from classroomDetails
        },
      },
    ]);

    // If no students found
    if (students.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.json(students);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get Single Student
export const getSingleStudent = asyncHandler(async (req, res) => {
  try {
    const _id = req.params.id; // Extract the student ID from the request parameters

    const student = await Student.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(_id) }, // Match the student by ID
      },
      {
        $lookup: {
          from: "classrooms", // The name of the collection to join
          localField: "classroom", // The field from the students collection
          foreignField: "_id", // The field from the classrooms collection
          as: "classroomDetails", // The alias for the joined field
        },
      },
      {
        $unwind: {
          path: "$classroomDetails",
          preserveNullAndEmptyArrays: true,
        }, // Unwind the classroomDetails array
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          contactPerson: 1,
          contactNo: 1,
          email: 1,
          birthDate: 1,
          "classroomDetails.className": 1, // Include only the className from classroomDetails
        },
      },
    ]);

    // If student not found, return 404
    if (!student || student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student[0]); // Send the first element of the result (since it's an array with one element)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Student
export const updateStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Student Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid student ID" });
    }

    const {
      firstName,
      lastName,
      contactPerson,
      contactNo,
      email,
      birthDate,
      classroom,
    } = req.body;

    //check record available on database
    const student = await Student.findById(id);
    if (!student) {
      res.status(400);
      throw new Error("Student not found");
    }

    // Check if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !contactPerson ||
      !contactNo ||
      !email ||
      !birthDate ||
      !classroom
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Email validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email address" });
    }

    // Find the classroom by name
    const classroomDetails = await Classroom.findById(classroom);

    // If classroom not found, return an error
    if (!classroomDetails) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    // update record
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        contactPerson,
        contactNo,
        email,
        birthDate,
        classroom,
      },
      { new: true }
    );

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Disable Student
export const disableStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Student Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid student ID" });
    }

    const student = await Student.findById(id);

    //check student available
    if (!student) {
      res.status(400).send({ message: "No data available" });
    }

    await Student.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
    res.status(200).send({ message: `(${id}): record disabled successfully` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Enable Student
export const enableStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Student Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid student ID" });
    }

    const student = await Student.findById(id);

    //check student available on database
    if (!student) {
      res.status(400).send({ message: "No data available" });
    }
    await Student.findByIdAndUpdate(id, { status: "active" }, { new: true });
    res.status(200).send({ message: `(${id}): record enabled successfully` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Delete Student
export const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Student Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid student ID" });
    }

    // Check if student exists
    const student = await Student.findById(id);
    if (!student) {
      res.status(400).send({ message: "No data available" });
    }

    // Delete record
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: `Student deleted successfully: ${id}` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});