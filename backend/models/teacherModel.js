import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add first name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Please add last name'],
        trim: true,
    },
    contactNo: {
        type: String,
        required: [true, 'Please add a contact number'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        trim: true,
    },
    status: {
        type: String,
        required: true,
        default: "active",
    },
}, {
    timestamps: true
})

export const Teacher = mongoose.model("Teacher", teacherSchema);