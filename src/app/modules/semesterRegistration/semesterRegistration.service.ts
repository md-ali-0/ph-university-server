import { BAD_REQUEST, CONFLICT, NOT_FOUND } from 'http-status';
import { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistration = async (
    payload: ISemesterRegistration,
): Promise<ISemesterRegistration> => {
    /**
     * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
     * Step2: Check if the semester is exist
     * Step3: Check if the semester is already registered!
     * Step4: Create the semester registration
     */

    const academicSemester = payload.academicSemester;

    // check if their any semester upcoming

    const isAcademicSemesterExists = await SemesterRegistration.findOne({
        $or: [
            { status: RegistrationStatus.upcoming },
            { status: RegistrationStatus.ongoing },
        ],
    });

    if (isAcademicSemesterExists) {
        throw new AppError(
            BAD_REQUEST,
            `Their is already a ${payload.status} register semester !`,
        );
    }

    const checkingAcademicSemester =
        await AcademicSemester.findById(academicSemester);

    if (!checkingAcademicSemester) {
        throw new AppError(NOT_FOUND, 'Academic Semester not found');
    }

    const isSemesterRegistrationExists =
        await SemesterRegistration.findById(academicSemester);

    const currentSemesterStatus = isSemesterRegistrationExists?.status;
    const requestedStatus = payload?.status;

    if (academicSemester) {
        const isSemesterRegistrationExists = await SemesterRegistration.findOne(
            { academicSemester },
        );
        if (isSemesterRegistrationExists)
            throw new AppError(
                CONFLICT,
                'Semester Registration Already Exists',
            );
    }

    if (currentSemesterStatus === RegistrationStatus.ended) {
        throw new AppError(
            BAD_REQUEST,
            `This semester is already ${currentSemesterStatus}`,
        );
    }

    // UPCOMING --> ONGOING --> ENDED
    if (
        currentSemesterStatus === RegistrationStatus.upcoming &&
        requestedStatus === RegistrationStatus.ended
    ) {
        throw new AppError(
            BAD_REQUEST,
            `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
        );
    }

    if (
        currentSemesterStatus === RegistrationStatus.ongoing &&
        requestedStatus === RegistrationStatus.upcoming
    ) {
        throw new AppError(
            BAD_REQUEST,
            `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
        );
    }

    const semesterRegistration = await SemesterRegistration.create(payload);
    return semesterRegistration;
};

const updateSemesterRegistration = async (
    id: string,
    payload: Partial<ISemesterRegistration>,
): Promise<ISemesterRegistration | null> => {
    // is the requested semester is ended . we will not updated
    const isRequestedSemesterEnded = await SemesterRegistration.findOne({
        _id: new Types.ObjectId(id),
        status: { $eq: RegistrationStatus.ended },
    });

    if (isRequestedSemesterEnded)
        throw new AppError(BAD_REQUEST, `This semester is already ended`);

    const semesterRegistration = await SemesterRegistration.findByIdAndUpdate(
        id,
        payload,
        { new: true },
    );
    return semesterRegistration;
};

const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(
        SemesterRegistration.find().populate('academicSemester'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await semesterRegistrationQuery.modelQuery;
    const meta = await semesterRegistrationQuery.countTotal();
    return {
        result,
        meta,
    };
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
