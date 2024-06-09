import { CONFLICT, NOT_FOUND } from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistration = async (
    payload: ISemesterRegistration,
): Promise<ISemesterRegistration> => {
    const academicSemester = payload.academicSemester;
    if (academicSemester) {
        const isAcademicSemesterExists = await AcademicSemester.findById(
            payload.academicSemester,
        );
        if (!isAcademicSemesterExists)
            throw new AppError(NOT_FOUND, 'Academic Semester not found');
    }
    if (academicSemester) {
        const isSemesterRegistrationExists = await SemesterRegistration.findOne(
            { academicSemester: payload.academicSemester },
        );
        if (isSemesterRegistrationExists)
            throw new AppError(
                CONFLICT,
                'Semester Registration Already Exists',
            );
    }
    const semesterRegistration = await SemesterRegistration.create(payload);
    return semesterRegistration;
};

const updateSemesterRegistration = async (
    id: string,
    payload: Partial<ISemesterRegistration>,
): Promise<ISemesterRegistration | null> => {
    const semesterRegistration = await SemesterRegistration.findByIdAndUpdate(
        id,
        payload,
        { new: true },
    );
    return semesterRegistration;
};

const getAllSemesterRegistration = async (
    query: Record<string, unknown>,
): Promise<ISemesterRegistration[] | null> => {
    const semesterRegistrationQuery = new QueryBuilder(
        SemesterRegistration.find().populate('academicSemester'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .limit()
        .fields();
    const semesterRegistration = await semesterRegistrationQuery.modelQuery;
    return semesterRegistration;
};
const getSingleSemesterRegistration = async (
    id: string,
): Promise<ISemesterRegistration | null> => {
    const semesterRegistration = await SemesterRegistration.findById(id);
    return semesterRegistration;
};

export const SemesterRegistrationService = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
};
