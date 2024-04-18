import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add last name']
    },
    contactNo: {
        type: String,
        required: [true, 'Please add a contact number']
    },
    email: {
        type: String,
        required: [true, 'Please add an email address']
    }
}, {
    timestamps: true
})

export const Teacher = mongoose.model("Teacher", teacherSchema);