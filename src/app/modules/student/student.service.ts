import { Types } from 'mongoose';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (): Promise<IStudent[] | null> => {
    const student = await Student.find()
        .populate({
            path: 'academicDepartment',
            populate: { path: 'academicFaculty' },
        })
        .populate('admissionSemester');
    return student;
};
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
    const student = await Student.findOne({ _id: new Types.ObjectId(id) })
        .populate({
            path: 'academicDepartment',
            populate: { path: 'academicFaculty' },
        })
        .populate('admissionSemester');
    return student;
};

export const StudentService = {
    getAllStudents,
    getSingleStudent,
};
