import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add last name']
    },
    contactPerson: {
        type: String,
        required: [true, 'Please add contact person']
    },
    contactNo: {
        type: String,
        required: [true, 'Please add contact number']
    },
    email: {
        type: String,
        required: [true, 'Please add an email address']
    },
    birthDate: {
        type: Date,
        required: [true, 'Please add date of birth']
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: [true, 'Please add your classroom' ]
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