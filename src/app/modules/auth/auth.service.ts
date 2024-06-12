import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
    const { password } = payload;
    const user = await User.isUserExistsByCustomId(payload.id);

    // checking if the user is exists
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
    }

    // checking if the user is already deleted
    if (await User.isUserDeleted(user.isDeleted)) {
        throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
    }

    // // checking if the user is already blocked
    if (await User.isUserBlocked(user.status)) {
        throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
    }

    // checking if user password is matched
    if (!(await User.isUserPasswordMatched(password, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, 'The user is incorrect');
    }

    const jwtPayload = { user: user.id, role: user.role };

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        {
            expiresIn: '10h',
        },
    );
    return {
        accessToken,
        needChangePassword: user?.needChangePassword,
    };
};

const changePassword = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string },
) => {
    const { oldPassword, newPassword } = payload;

    const user = await User.isUserExistsByCustomId(userData.user);

    // checking if the user is exists
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
    }

    // checking if the user is already deleted
    if (await User.isUserDeleted(user.isDeleted)) {
        throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
    }

    // // checking if the user is already blocked
    if (await User.isUserBlocked(user.status)) {
        throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
    }

    // checking if user password is matched
    if (!(await User.isUserPasswordMatched(oldPassword, user?.password))) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            'The User password is incorrect',
        );
    }

    const newHasPassword = await bcrypt.hash(newPassword, Number(config.salt));

    await User.findOneAndUpdate(
        {
            id: userData.user,
            role: userData.role,
        },
        {
            password: newHasPassword,
            needChangePassword: false,
            passwordChangeAt: new Date(),
        }
    );

    return null;
};

export const AuthService = {
    loginUser,
    changePassword,
};
