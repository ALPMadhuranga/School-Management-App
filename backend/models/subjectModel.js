import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subName: {
        type: String,
        required: [true, 'Please add subject name'],
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

export const Subject = mongoose.model("Subject", subjectSchema);