import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.createOfferedCourseIntoDB(
        req.body,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course is created successfully !',
        data: result,
    });
});

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.getAllOfferedCoursesFromDB(
        req.query,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourses retrieved successfully !',
        meta: result.meta,
        data: result.result,
    });
});

const getMyOfferedCourses = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await OfferedCourseService.getMyOfferedCoursesFromDB(
        userId,
        req.query,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourses retrieved successfully !',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleOfferedCourses = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result =
            await OfferedCourseService.getSingleOfferedCourseFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'OfferedCourse fetched successfully',
            data: result,
        });
    },
);

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await OfferedCourseService.updateOfferedCourseIntoDB(
        id,
        req.body,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourse updated successfully',
        data: result,
    });
});

const deleteOfferedCourseFromDB = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await OfferedCourseService.deleteOfferedCourseFromDB(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'OfferedCourse deleted successfully',
            data: result,
        });
    },
);

export const OfferedCourseController = {
    createOfferedCourse,
    getAllOfferedCourses,
    getMyOfferedCourses,
    getSingleOfferedCourses,
    updateOfferedCourse,
    deleteOfferedCourseFromDB,
};
