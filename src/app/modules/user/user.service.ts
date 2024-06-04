import httpStatus from 'http-status';
import { startSession } from 'mongoose';
import config from '../../config';
import AppError from '../../error/AppError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentID } from './user.utils';

const createStudent = async (password: string, payload: IStudent) => {
    const userData: Partial<IUser> = {};

    userData.password = password || (config.default_password as string);
    userData.role = 'student';

    // menually genereated id

    const academicSemester = await AcademicSemester.findById(
        payload.admissionSemester,
    );

    const studentID = await generateStudentID(
        academicSemester as IAcademicSemester,
    );

    userData.id = studentID;

    const session = await startSession();

    try {
        session.startTransaction();

        // create a user
        const result = await User.create([userData], { session }); //Transaction 1

        if (!result.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }

        payload.id = studentID;
        payload.user = result[0]._id;

        const newStudent = await Student.create([payload], { session }); //Transaction 2

        if (!newStudent.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create student',
            );
        }

        await session.commitTransaction();
        return newStudent;
        
    } catch (error) {
        await session.abortTransaction();
        throw error
    } finally {
        await session.endSession();
    }
};

export const UserService = {
    createStudent,
};
