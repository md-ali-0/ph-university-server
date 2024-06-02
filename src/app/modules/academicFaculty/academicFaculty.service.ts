import { Types } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
    const academicFaculty = await AcademicFaculty.create(payload);
    return academicFaculty;
};

const updateAcademicFaculty = async (
    id: string,
    payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
    const academicSemester = await AcademicFaculty.findByIdAndUpdate(
        id,
        payload,
        { new: true },
    );
    return academicSemester;
};

const getAllAcademicFaculties = async (): Promise<IAcademicFaculty[]> => {
    const academicSemesters = await AcademicFaculty.find();
    return academicSemesters;
};

const getSingleAcademicFaculty = async (
    id: string,
): Promise<IAcademicFaculty | null> => {
    const academicSemester = await AcademicFaculty.findOne({
        _id: new Types.ObjectId(id),
    });
    return academicSemester;
};

export const AcademicFacultyService = {
    createAcademicFaculty,
    updateAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
};
