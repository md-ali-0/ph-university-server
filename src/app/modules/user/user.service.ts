import config from '../../config';
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

    // create a user
    const result = await User.create(userData);

    // create a student
    if (Object.keys(result).length) {
        // set id, _id
        payload.id = studentID;
        payload.user = result._id;

        const newStudent = await Student.create(payload);
        return newStudent;
    }
};

export const UserService = {
    createStudent,
};
