import { Schema, model } from 'mongoose';
import { semesterRegistrationStatus } from './semesterRegistration.constant';
import { ISemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<ISemesterRegistration>(
    {
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: semesterRegistrationStatus,
            required: true,
            default: 'upcoming',
        },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        minCredit: { type: Number, required: true },
        maxCredit: { type: Number, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

export const SemesterRegistration = model<ISemesterRegistration>(
    'SemesterRegistration',
    semesterRegistrationSchema,
);
