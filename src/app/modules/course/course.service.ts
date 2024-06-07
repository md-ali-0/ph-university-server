import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { ICourse } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: ICourse): Promise<ICourse | null> => {
    const result = await Course.create(payload);
    return result;
};

const getAllCourses = async (
    query: Record<string, unknown>,
): Promise<ICourse[] | null> => {
    const CourseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
        .search(courseSearchableFields)
        .filter()
        .fields()
        .paginate()
        .limit();
    const result = await CourseQuery.modelQuery;
    return result;
};

const getSingleCourse = async (id: string): Promise<ICourse | null> => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
};

const updateCourse = async (
    id: string,
    payload: ICourse,
): Promise<ICourse | null> => {
    const result = await Course.findByIdAndUpdate(id, payload);
    return result;
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
};
