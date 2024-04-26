import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    contactPerson: {
        type: String,
        required: [true, 'Please add contact person'],
        trim: true,
    },
    contactNo: {
        type: String,
        required: [true, 'Please add contact number'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        trim: true,
    },
    birthDate: {
        type: Date,
        required: [true, 'Please add date of birth'],
        trim: true,
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: [true, 'Please add your classroom' ],
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

export const Student = mongoose.model("Student", studentSchema);