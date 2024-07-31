/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { startSession } from 'mongoose';
import config from '../../config';
import AppError from '../../error/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
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

const createStudent = async (
    file: any,
    password: string,
    payload: IStudent,
) => {
    const userData: Partial<IUser> = {};

    userData.password = password || (config.default_password as string);
    userData.role = 'student';
    userData.email = payload.email;

    // menually genereated id

    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester,
    );

    if (!admissionSemester) {
        throw new AppError(400, 'Admission semester not found');
    }

    // find department
    const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Aademic department not found');
    }
    payload.academicFaculty = academicDepartment.academicFaculty;

    const session = await startSession();

    try {
        session.startTransaction();

        const studentID = await generateStudentID(admissionSemester);

        userData.id = studentID;

        if (file) {
            const imageName = `${userData.id}${payload?.name?.firstName}`;
            const path = file?.path;

            //send image to cloudinary
            const { secure_url } = await sendImageToCloudinary(imageName, path);
            payload.avatar = secure_url as string;
        }

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

const createFacultyIntoDB = async (
    file: any,
    password: string,
    payload: TFaculty,
) => {
    // create a user object
    const userData: Partial<IUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    //set student role
    userData.role = 'faculty';
    userData.email = payload.email;

    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    payload.academicFaculty = academicDepartment?.academicFaculty;

    const session = await startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        if (file) {
            const imageName = `${userData.id}${payload?.name?.firstName}`;
            const path = file?.path;

            //send image to cloudinary
            const { secure_url } = await sendImageToCloudinary(imageName, path);
            payload.avatar = secure_url as string;
        }

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
        return newFaculty;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
};

const createAdminIntoDB = async (
    file: any,
    password: string,
    payload: TFaculty,
) => {
    // create a user object
    const userData: Partial<IUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);

    //set student role
    userData.role = 'admin';
    userData.email = payload.email;

    const session = await startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        if (file) {
            const imageName = `${userData.id}${payload?.name?.firstName}`;
            const path = file?.path;

            //send image to cloudinary
            const { secure_url } = await sendImageToCloudinary(imageName, path);
            payload.avatar = secure_url as string;
        }

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
    } catch (err) {
        await session.abortTransaction();

        throw err;
    } finally {
        await session.endSession();
    }
};

const getMe = async (userId: string, role: string) => {
    // const decoded = verifyToken(token, config.jwt_access_secret as string);
    // const { userId, role } = decoded;

    let result = null;
    if (role === 'student') {
        result = await Student.findOne({ id: userId }).populate('user');
    }
    if (role === 'admin') {
        result = await Admin.findOne({ id: userId }).populate('user');
    }

    if (role === 'faculty') {
        result = await Faculty.findOne({ id: userId }).populate('user');
    }

    return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

export const UserService = {
    createStudent,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMe,
    changeStatus,
};
