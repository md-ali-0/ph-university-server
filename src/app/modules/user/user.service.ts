import { IStudent } from '../student/student.interface';
import { User } from './user.model';

const createStudent = async (payload: IStudent): Promise<IStudent | null> => {
    // const student = new Student(payload);
    // if (await student.isUserExits(payload.id)) {
    //     throw new Error('User Already Exists');
    // }
    // const result = student.save()
    // if (await User.isUserExits(payload.id)) {
    //     throw new Error('User Already Exists');
    // }
    const student = await User.create(payload);
    return student;
};

export const UserService = {
    createStudent,
};
