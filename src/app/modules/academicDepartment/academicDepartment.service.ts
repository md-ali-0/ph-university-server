import { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
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

const getAllAcademicDepartments = async (query: Record<string, unknown>) => {
    const academicDepartmentQuery = new QueryBuilder(
        AcademicDepartment.find().populate('academicFaculty'),
        query,
    )
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await academicDepartmentQuery.modelQuery;
    const meta = await academicDepartmentQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleAcademicDepartment = async (
    id: string,
): Promise<IAcademicDepartment | null> => {
    const academicDepartment = await AcademicDepartment.findOne({
        _id: new Types.ObjectId(id),
    }).populate('academicFaculty');
    return academicDepartment;
};

export const AcademicDepartmentService = {
    createAcademicDepartment,
    updateAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
};
