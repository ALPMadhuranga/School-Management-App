import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    className: {
        type: String,
        required: [true, 'Please add classromm name']
    },
}, {
    timestamps: true
})

export const Classroom = mongoose.model("Classroom", classroomSchema);