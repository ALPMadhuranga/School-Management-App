import mongoose from "mongoose";

const allocateClassroomSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'Please add a teacher']
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: [true, 'Please add a classroom']
    },
}, {
    timestamps: true
});

export const AllocateClassroom = mongoose.model("AllocateClassroom", allocateClassroomSchema);
