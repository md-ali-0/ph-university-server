import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../error/AppError';
import { code, month, name } from './academicSemester.constance';
import { IAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
    {
        name: { type: String, required: true, enum: name },
        code: { type: String, required: true, enum: code },
        year: { type: String, required: true },
        startMonth: { type: String, required: true, enum: month },
        endMonth: { type: String, required: true, enum: month },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    });

    if (isSemesterExists) {
        throw new AppError(httpStatus.CONFLICT, 'Semester Already Exists');
    }
    next();
});

export const AcademicSemester = model<IAcademicSemester>(
    'AcademicSemester',
    academicSemesterSchema,
);
