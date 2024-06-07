import httpStatus from 'http-status';
import { Types, startSession } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { IStudent } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './students.constant';

const getAllStudents = async (
    query: Record<string, unknown>,
): Promise<IStudent[] | null> => {
    // let searchTerm: unknown = '';

    // const queryObject = { ...query };

    // if (query?.searchTerm) {
    //     searchTerm = query?.searchTerm;
    // }
    // const studentSearchableFields = [
    //     'email',
    //     'name.firstName',
    //     'name.lastName',
    //     'contact',
    // ];

    // // filtering
    // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    // excludeFields.forEach(el => delete queryObject[el]);

    // let limit = 1;
    // let page = 1;
    // let skip = 0;
    // let fields = '-__v';
    // let sort = 'createdAt';

    // if (query.sort) {
    //     sort = query.sort as string;
    // }

    // if (query.limit) {
    //     limit = Number(query.limit);
    // }

    // if (query.page) {
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // }
    // if (query.page) {
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // }
    // if (query.fields) {
    //     fields = (query.fields as string).split(',').join(' ');
    // }

    // const searchQuery = Student.find({
    //     $or: studentSearchableFields.map(field => ({
    //         [field]: { $regex: searchTerm, $options: 'i' },
    //     })),
    // });

    // const filterQuery = searchQuery
    //     .find(queryObject)
    // .populate({
    //     path: 'academicDepartment',
    //     populate: { path: 'academicFaculty' },
    // })
    // .populate('admissionSemester');

    // const sortQuery = filterQuery.sort(sort);

    // const skipQuery = sortQuery.skip(skip);

    // const limitQuery = skipQuery.limit(limit);

    // const filedQuery = await limitQuery.select(fields)

    const studentQuery = new QueryBuilder(
        Student.find()
            .populate({
                path: 'academicDepartment',
                populate: { path: 'academicFaculty' },
            })
            .populate('admissionSemester'),
        query,
    )
        .search(studentSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();

    const result = await studentQuery.modelQuery;

    return result;
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
        _id: new Types.ObjectId(id),
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

        const deletedUser = await User.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete User');
        }

        const deletedStudent = await Student.findByIdAndUpdate(
            id,
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
