import httpStatus from 'http-status';
import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await AuthService.loginUser(payload);
    const { accessToken, refreshToken, needChangePassword } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Login successfully',
        data: { accessToken, needChangePassword },
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

const getRefreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.getRefreshToken(refreshToken);
    const { accessToken, needChangePassword } = result;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access is retrieved successfully',
        data: { accessToken, needChangePassword },
    });
});

const forgetPassword = catchAsync(async (req, res) => {
    const userId = req.body.id;

    const result = await AuthService.forgetPassword(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset link is generated successfully',
        data: result,
    });
});

const resetPassword = catchAsync(async (req, res) => {
    const payload = req.body;
    const token = req.headers.authorization;

    const result = await AuthService.resetPassword(payload, token as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password reset succesful!',
        data: result,
    });
});

export const AuthController = {
    loginUser,
    changePassword,
    getRefreshToken,
    forgetPassword,
    resetPassword,
};
