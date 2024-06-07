import { Schema, model } from 'mongoose';
import { ICourse, IPreRequisiteCourses } from './course.interface';

const preRequisiteCourseSchema = new Schema<IPreRequisiteCourses>({
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true, unique: true, trim: true },
        prefix: { type: String, required: true, trim: true },
        code: { type: Number, required: true },
        credit: { type: Number, required: true },
        preRequisiteCourses: {
            type: [preRequisiteCourseSchema],
        },
        isDeleted: { type: Boolean, default: false },
    },
    { versionKey: false, timestamps: true },
);

export const Course = model<ICourse>('Course', courseSchema);
