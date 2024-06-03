import { Types } from 'mongoose';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartment = async (payload: IAcademicDepartment) => {
    const academicDepartment = await AcademicDepartment.create(payload);
    return academicDepartment;
};

const updateAcademicDepartment = async (
    id: string,
    payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
    const academicDepartment = await AcademicDepartment.findByIdAndUpdate(
        id,
        payload,
        { new: true },
    );
    return academicDepartment;
};

const getAllAcademicDepartments = async (): Promise<IAcademicDepartment[]> => {
    const academicDepartments = await AcademicDepartment.find().populate('academicFaculty');
    return academicDepartments;
};

const getSingleAcademicDepartment = async (
    id: string,
): Promise<IAcademicDepartment | null> => {
    const academicDepartment = await AcademicDepartment.findOne({
        _id: new Types.ObjectId(id),
    });
    return academicDepartment;
};

export const AcademicDepartmentService = {
    createAcademicDepartment,
    updateAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
};
