import mongoose from "mongoose";

const allocateSubjectSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'Please add a teacher']
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: [true, 'Please add a subject']
    },
}, {
    timestamps: true
});

export const AllocateSubject = mongoose.model("AllocateSubject", allocateSubjectSchema);