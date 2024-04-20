import asyncHandler from "express-async-handler";
import { Teacher } from "../models/teacherModel.js";
import mongoose from "mongoose";

// Add a Teacher
export const addTeacher = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, contactNo, email } = req.body;
    // check that fields are empty or not
    if (!firstName || !lastName || !contactNo || !email) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Email validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email address" });
    }

    //check email exist on database
    const existEmail = await Teacher.findOne({ email });
    if (existEmail) {
      return res.status(400).send({ message: "Email already exists" });
    }

    //crate record
    const teacher = await Teacher.create({
      firstName,
      lastName,
      contactNo,
      email,
    });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get All Teachers
export const getAllTeachers = asyncHandler(async (req, res) => {
  try {
    const teachers = await Teacher.find({});

    // If no teachers found
    if (teachers.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    // Get all teachers
    return res.status(200).json({
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get Single Teacher
export const getSingleTeacher = asyncHandler(async (req, res) => {
  try {
    //get teacher id from url
    const { id } = req.params;

    // Subject Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid teacher ID" });
    }

    //check teacher exist on database
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).send({ message: "Teacher not found" });
    }

    // Get single teacher
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update Teacher
export const updateTeacher = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, contactNo, email } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !contactNo || !email) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Email validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email address" });
    }

    // Teacher Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid teacher ID" });
    }

    // update record
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        contactNo,
        email,
      },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).send({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Disable teacher record
export const disableTeacher = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Teacher Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid teacher ID" });
    }

    const teacher = await Teacher.findById(id);

    //check teacher available
    if (!teacher) {
      res.status(400).send({ message: "No data available" });
    }
    await Teacher.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
    res.status(200).send({ message: `(${id}): record disabled successfully` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

//Enable teacher record
export const enableTeacher = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Teacher Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid teacher ID" });
    }

    const teacher = await Teacher.findById(id);

    //check teacher available on database
    if (!teacher) {
      res.status(400).send({ message: "No data available" });
    }
    await Teacher.findByIdAndUpdate(id, { status: "active" }, { new: true });
    res.status(200).send({ message: `(${id}): record enabled successfully` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Delete Teacher
export const deleteTeacher = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Teacher Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid teacher ID" });
    }

    // Check if teacher exists
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      res.status(400).send({ message: "No data available" });
    }

    // Delete record
    await Teacher.findByIdAndDelete(id);
    res.status(200).json({ message: `Teacher deleted successfully: ${id}` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
