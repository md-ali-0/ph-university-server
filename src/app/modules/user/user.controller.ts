import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
// import userValidationSchema from './user.validation';

const createStudent = catchAsync(async (req, res, next) => {
    const { password, student: studentData } = req.body;

    // const zodParseData = userValidationSchema.parse(payload)

    const result = await UserService.createStudent(password, studentData);

    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: 'Student Created Successfully',
        data: result,
    });
});

export const UserController = {
    createStudent,
};
