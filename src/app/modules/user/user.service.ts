import httpStatus from 'http-status';
import { startSession } from 'mongoose';
import config from '../../config';
import AppError from '../../error/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
    generateAdminId,
    generateFacultyId,
    generateStudentID,
} from './user.utils';

const createStudent = async (password: string, payload: IStudent) => {
    const userData: Partial<IUser> = {};

    userData.password = password || (config.default_password as string);
    userData.role = 'student';
    userData.email = payload.email

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
        throw error;
    } finally {
        await session.endSession();
    }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<IUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    //set student role
    userData.role = 'faculty';
    userData.email = payload.email

    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create faculty',
            );
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<IUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    //set student role
    userData.role = 'admin';
    userData.email = payload.email

    const session = await startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create admin',
            );
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create admin',
            );
        }

        await session.commitTransaction();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();

        throw new Error(err);
    } finally {
        await session.endSession();
    }
};

export const UserService = {
    createStudent,
    createFacultyIntoDB,
    createAdminIntoDB,
};
