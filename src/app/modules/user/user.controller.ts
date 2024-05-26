import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
// import userValidationSchema from './user.validation';

const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { password, student: studentData } = req.body;

        // const zodParseData = userValidationSchema.parse(payload)

        const result = await UserService.createStudent(password, studentData);

        sendResponse(res, {
            statusCode: httpStatus.ACCEPTED,
            success: true,
            message: 'Student Created Successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const UserController = {
    createStudent,
};
