import { Schema, model } from 'mongoose';
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
        throw new Error('This Department is Already Exist !');
    }
    next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema,
);
