import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await CourseService.createCourse(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Course is created successfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseService.getAllCourses(req.query);
    sendResponse(res, {
        statusCode: httpStatus.FOUND,
        success: true,
        message: 'Courses fetched successfully',
        data: result,
    });
});

const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseService.getSingleCourse(id);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Courses fetched successfully',
        data: result,
    });
});

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await CourseService.updateCourse(id, data);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses Updated successfully',
        data: result,
    });
});

const createAssignFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { faculties } = req.body;
    const result = await CourseService.createAssignFaculty(id, faculties);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses Faculties Assign successfully',
        data: result,
    });
});
const removeCrouseFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { faculties } = req.body;
    const result = await CourseService.removeCrouseFaculty(id, faculties);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses Faculties Assign successfully',
        data: result,
    });
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseService.deleteCourse(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses Updated successfully',
        data: result,
    });
});

export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    createAssignFaculty,
    removeCrouseFaculty
};
