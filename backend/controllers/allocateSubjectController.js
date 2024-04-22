import asyncHandler from "express-async-handler";
import { AllocateSubject } from "../models/allocateSubjectModel.js";
import { Subject } from "../models/subjectModel.js";
import { Teacher } from "../models/teacherModel.js";

// Add AllocateSubject
export const addAllocateSubject = asyncHandler(async (req, res) => {
  try {
    const { teacher, subject } = req.body;
    // check that fields are empty or not
    if (!teacher || !subject) {
      return res.status(400).send({ message: "All fields are required" });
    }

    //check subject exist on database
    const existSubject = await Subject.findById(subject);
    const existTeacher = await Teacher.findById(teacher);
    if (!existSubject || !existTeacher) {
      return res.status(400).send({ message: "Subject or Teacher not found" });
    }

    //crate record
    const allocateSubject = await AllocateSubject.create({
      teacher,
      subject,
    });
    res.status(200).json(allocateSubject);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      return res.status(400).send({
        message:
          "Duplicate error: Teacher and Subject combination already exists",
      });
    } else {
      // Other errors, pass to the global error handler
      res.status(400).json(error);
    }
  }
});

// Get All AllocateSubjects
export const getAllocateSubjects = asyncHandler(async (req, res) => {
  try {
    const allocateSubjects = await AllocateSubject.aggregate([
      {
        $lookup: {
          from: "teachers",
          localField: "teacher",
          foreignField: "_id",
          as: "teacherDetails",
        },
      },
      {
        $unwind: {
          path: "$teacherDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject",
          foreignField: "_id",
          as: "subjectDetails",
        },
      },
      {
        $unwind: {
          path: "$subjectDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          teacher: {
            $concat: [
              "$teacherDetails.firstName",
              " ",
              "$teacherDetails.lastName",
            ],
          },
          subject: {
            subjectName: "$subjectDetails.subName",
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
    if (allocateSubjects.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.json(allocateSubjects);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get Single AllocateSubject
export const getAllocateSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    //Check if the allocate subject available in the database
    const allocateSubject = await AllocateSubject.findById(id)
      .populate({ path: "teacher", select: "firstName lastName" })
      .populate({ path: "subject", select: "subName" });

    if (!allocateSubject) {
      return res.status(404).json({ message: "No data available" });
    }

    // Extract only the required fields (teacher name and subject name)
    const { _id, teacher, subject, createdAt, updatedAt } = allocateSubject;
    const response = {
      _id,
      teacher: teacher.firstName + " " + teacher.lastName,
      subject: subject.subName,
      createdAt,
      updatedAt,
    };

    res.json(response);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Update AllocateSubject
export const updateAllocateSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { teacher, subject } = req.body;

    //Check that fields are complete
    if (!teacher || !subject) {
      return res.status(400).send({ message: "All fields are required" });
    }

    //Check if the allocate subject available in the database
    const allocateSubject = await AllocateSubject.findById(id);
    if (!allocateSubject) {
      res.status(400).send({ message: "No data available" });
    }

    //check subject exist on database
    const existSubject = await Subject.findById(subject);
    const existTeacher = await Teacher.findById(teacher);
    if (!existSubject || !existTeacher) {
      return res.status(400).send({ message: "Subject or Teacher not found" });
    }

    //update record
    const updateAllocateSubject = await AllocateSubject.findByIdAndUpdate(
      id,
      { teacher, subject },
      { new: true }
    );
    res.status(200).json(updateAllocateSubject);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete AllocateSubject
export const deleteAllocateSubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Allocate Subject Id (ObjectId) validate
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Allocate Subject ID" });
    }

    // Check if addAllocate Subject exists
    const ExistAllocateSubject = await AllocateSubject.findById(id);
    if (!ExistAllocateSubject) {
      res.status(400).send({ message: "No data available" });
    }

    // Delete record
    await AllocateSubject.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: `Allocate Subject deleted successfully: ${id}` });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});