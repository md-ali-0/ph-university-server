import config from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';

const createStudent = async (password: string, studentData: IStudent) => {
    const userData: Partial<IUser> = {};

    userData.password = password || (config.default_password as string);
    userData.role = 'student';

    // menually genereated id
    userData.id = 'PH20308011'

    // create a user
    const result = await User.create(userData);

    // create a student
    if (Object.keys(result).length) {
        // set id, _id
        studentData.id = result.id
        studentData.user = result._id

        const newStudent = await Student.create(studentData)
    }
};

export const UserService = {
    createStudent,
};
