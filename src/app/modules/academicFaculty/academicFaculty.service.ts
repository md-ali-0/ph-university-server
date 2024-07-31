import { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
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
    const academicFaculty = await AcademicFaculty.findByIdAndUpdate(
        id,
        payload,
        { new: true },
    );
    return academicFaculty;
};

const getAllAcademicFaculties = async (query: Record<string, unknown>) => {
    const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await academicFacultyQuery.modelQuery;
    const meta = await academicFacultyQuery.countTotal();

    return {
        meta,
        result,
    };
};
const getSingleAcademicFaculty = async (
    id: string,
): Promise<IAcademicFaculty | null> => {
    const academicFaculty = await AcademicFaculty.findOne({
        _id: new Types.ObjectId(id),
    });
    return academicFaculty;
};

export const AcademicFacultyService = {
    createAcademicFaculty,
    updateAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
};
