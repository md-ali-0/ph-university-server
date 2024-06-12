import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await AuthService.loginUser(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Login successfully',
        data: result,
    });
});

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;

    const result = await AuthService.changePassword(req.user, passwordData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Password Changed successfully',
        data: result,
    });
});

export const AuthController = {
    loginUser,
    changePassword,
};
