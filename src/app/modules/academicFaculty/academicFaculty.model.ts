import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

export const AcademicFaculty = model('AcademicFaculty', academicFacultySchema);
