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
    email: {
        type: String,
        required: [true, 'Please add an email address']
    },
    dob: {
        type: Date,
        required: [true, 'Please add date of birth']
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: [true, 'Please add your classroom' ]
    }
}, {
    timestamps: true
})

export const Student = mongoose.model("Student", studentSchema);