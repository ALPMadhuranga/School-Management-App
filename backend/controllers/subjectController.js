import asyncHandler from "express-async-handler";
import { Subject } from "../models/subjectModel.js";
import mongoose from "mongoose";

// Add Subject
export const addSubject = asyncHandler(async (req, res) => {
  try {
    const { subjectName } = req.body;

    // check that fields are empty or not
    if (!subjectName) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if the subject already exists in the database
    const existingSubject = await Subject.findOne({ subjectName });

    if (existingSubject) {
      return res.status(400).send({ message: "Subject already exists" });
    }

    //crate record
    const subject = await Subject.create({
      subjectName,
    });

    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get All Subjects
export const getAllSubjects = asyncHandler(async (req, res) => {
  try {
    const subjects = await Subject.find({});

    // If no subjects found
    if (subjects.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    // Get all subjects
    return res.status(200).json({
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get Single Subject
export const getSingleSubject = asyncHandler(async (req, res) => {
  try {
    //get subject id from url
    const { id } = req.params;

    // Subject Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid subject ID" });
    }
    const subject = await Subject.findById(id);

    //check subject exist on database
    if (!subject) {
      return res.status(404).send({ message: "Subject not found" });
    }

    // Get single subject
    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update Subject
export const updateSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Subject Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid subject ID" });
    }

    const { subjectName } = req.body;

    // Check if all required fields are provided
    if (!subjectName) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // update record
    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      {
        subjectName,
      },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).send({ message: "Subject not found" });
    }

    res.status(200).json(updatedSubject);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Disable teacher record
export const disableSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Subject Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid subject ID" });
    }

    const subject = await Subject.findById(id);

    //check subject available
    if (!subject) {
      res.status(400).send({ message: "No data available" });
    }
    await Subject.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
    res
      .status(200)
      .send({ message: `Subject (${id}): record disabled successfully` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

//Enable subject record
export const enableSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Subject Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid subject ID" });
    }

    const subject = await Subject.findById(id);

    //check subject available on database
    if (!subject) {
      res.status(400).send({ message: "No data available" });
    }

    await Subject.findByIdAndUpdate(id, { status: "active" }, { new: true });
    res
      .status(200)
      .send({ message: `Subject (${id}): record enabled successfully` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Delete Subject
export const deleteSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Subject Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid subject ID" });
    }

    // Check if subject exists
    const subject = await Subject.findById(id);
    if (!subject) {
      res.status(400).send({ message: "No data available" });
    }

    // Delete record
    await Subject.findByIdAndDelete(id);
    res.status(200).json({ message: `Subject deleted successfully: ${id}` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
