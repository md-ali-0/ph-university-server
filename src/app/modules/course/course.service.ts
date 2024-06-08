import httpStatus from 'http-status';
import { startSession } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { courseSearchableFields } from './course.constant';
import { ICourse, ICourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

const createCourse = async (payload: ICourse): Promise<ICourse | null> => {
    const result = await Course.create(payload);
    return result;
};

const getAllCourses = async (
    query: Record<string, unknown>,
): Promise<ICourse[] | null> => {
    const CourseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourses.course'),
        query,
    )
        .search(courseSearchableFields)
        .filter()
        .fields()
        .paginate()
        .limit();
    const result = await CourseQuery.modelQuery;
    return result;
};

const getSingleCourse = async (id: string): Promise<ICourse | null> => {
    const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
    );
    return result;
};
const createAssignFaculty = async (
    id: string,
    payload: Partial<ICourseFaculty>,
): Promise<ICourseFaculty | null> => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $addToSet: { course: id, faculties: { $each: payload } },
        },
        { upsert: true, new: true },
    );
    return result;
};

const removeCrouseFaculty = async (
    id: string,
    payload: Partial<ICourseFaculty>,
): Promise<ICourseFaculty | null> => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: { faculties: { $in: payload } },
        },
        { new: true },
    );
    return result;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
    const { preRequisiteCourses, ...remainingCourseData } = payload;

    const session = await startSession();

    try {
        session.startTransaction();

        // Basic Course Update

        const basicCourseInfo = await Course.findByIdAndUpdate(
            id,
            remainingCourseData,
            { new: true, runValidators: true, session },
        );

        if (!basicCourseInfo) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to Update Course Information',
            );
        }

        // checking preRequisiteCourses

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // deleted PreRequisite Courses

            const deletedPreRequisite = preRequisiteCourses
                .filter(el => el.isDeleted)
                .map(el => el.course);

            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourses: {
                            course: { $in: deletedPreRequisite },
                        },
                    },
                },
                { session },
            );

            if (!deletedPreRequisiteCourses) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    'Failed to Update Course Information',
                );
            }

            // new PreRequisite Courses
            const newPreRequisite = preRequisiteCourses.filter(
                el => !el.isDeleted,
            );

            const newPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: {
                        preRequisiteCourses: { $each: newPreRequisite },
                    },
                },
                { session },
            );

            if (!newPreRequisiteCourses) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    'Failed to Update Course Information',
                );
            }
        }

        await session.commitTransaction();

        const result = await Course.findById(id).populate(
            'preRequisiteCourses',
        );
        return result;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

const deleteCourse = async (id: string): Promise<ICourse | null> => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};

export const CourseService = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getSingleCourse,
    createAssignFaculty,
    removeCrouseFaculty
};
