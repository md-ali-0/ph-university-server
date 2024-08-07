import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
// import userValidationSchema from './user.validation';

const createStudent = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;

    // const zodParseData = userValidationSchema.parse(payload)

    const result = await UserService.createStudent(
        req.file,
        password,
        studentData,
    );

    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: 'Student Created Successfully',
        data: result,
    });
});

const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;

    const result = await UserService.createFacultyIntoDB(
        req.file,
        password,
        facultyData,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is created succesfully',
        data: result,
    });
});

const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    const result = await UserService.createAdminIntoDB(
        req.file,
        password,
        adminData,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});

const getMe = catchAsync(async (req, res) => {
    // const token = req.headers.authorization;

    // if (!token) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found !');
    // }

    const { userId, role } = req.user;

    const result = await UserService.getMe(userId, role);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is retrieved succesfully',
        data: result,
    });
});

const changeStatus = catchAsync(async (req, res) => {
    const id = req.params.id;

    const result = await UserService.changeStatus(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Status is updated succesfully',
        data: result,
    });
});

export const UserController = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus,
};
