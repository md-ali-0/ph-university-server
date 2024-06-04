import httpStatus from 'http-status';
import { startSession } from 'mongoose';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (): Promise<IStudent[] | null> => {
    const student = await Student.find({ isDeleted: false })
        .populate({
            path: 'academicDepartment',
            populate: { path: 'academicFaculty' },
        })
        .populate('admissionSemester');
    return student;
};

const updateStudent = async (
    id: string,
    payload: Partial<IStudent>,
): Promise<IStudent | null> => {
    const { name, guardian, localGuardian, ...remainingData } = payload;

    const modifiedData: Record<string, unknown> = {
        ...remainingData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedData[`localGuardian.${key}`] = value;
        }
    }

    const student = await Student.findOneAndUpdate({ id }, modifiedData, {
        new: true,
        runValidators: true,
    });
    return student;
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
    const student = await Student.findOne({
        id,
        isDeleted: false,
    })
        .populate({
            path: 'academicDepartment',
            populate: { path: 'academicFaculty' },
        })
        .populate('admissionSemester');
    return student;
};

const deleteStudent = async (
    id: string,
): Promise<IStudent | null | unknown> => {
    const session = await startSession();
    try {
        session.startTransaction();

        const deletedUser = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete User');
        }

        const deletedStudent = await Student.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedStudent) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to Delete Student',
            );
        }

        await session.commitTransaction();
        return deletedStudent;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

export const StudentService = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent,
};
