import { Types } from 'mongoose';
import { academicSemesterNameCodeMapper } from './academicSemester.constance';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (
    payload: IAcademicSemester,
): Promise<IAcademicSemester> => {

    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Semester Code Not Match !');
    }

    const academicSemester = await AcademicSemester.create(payload);
    return academicSemester;
};
const updateAcademicSemester = async (
    id: string,
    payload: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
    const academicSemester = await AcademicSemester.findByIdAndUpdate(
        id,
        payload,
        { new: true },
    );
    return academicSemester;
};
const getAllAcademicSemesters = async (): Promise<IAcademicSemester[]> => {
    const academicSemesters = await AcademicSemester.find();
    return academicSemesters;
};

const getSingleAcademicSemester = async (
    id: string,
): Promise<IAcademicSemester | null> => {
    const academicSemester = await AcademicSemester.findOne({
        _id: new Types.ObjectId(id),
    });
    return academicSemester;
};

export const AcademicSemesterService = {
    createAcademicSemester,
    updateAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
};
