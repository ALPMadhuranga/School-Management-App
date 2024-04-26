import mongoose from "mongoose";

const allocateClassroomSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'Please add a teacher'],
        trim: true,
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: [true, 'Please add a classroom'],
        trim: true,
    },
}, {
    timestamps: true
});

export const AllocateClassroom = mongoose.model("AllocateClassroom", allocateClassroomSchema);
