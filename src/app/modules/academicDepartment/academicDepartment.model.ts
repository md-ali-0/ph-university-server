import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../error/AppError';
import { IAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExists = await AcademicDepartment.findOne({
        name: this.name,
    });
    if (isDepartmentExists) {
        throw new AppError(httpStatus.CONFLICT,'This Department is Already Exist !');
    }
    next();
});
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();

    const isDepartmentExists = await AcademicDepartment.findOne({ query });
    if (!isDepartmentExists) {
        throw new AppError(httpStatus.NOT_FOUND,'This Department is not Exist !');
    }
    next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema,
);
