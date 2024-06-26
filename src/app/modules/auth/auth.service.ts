import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import { sendEmail } from '../../utils/sendEmail';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';

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

    const accessToken = await createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_in as string,
    );
    const refreshToken = await createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expire_in as string,
    );

    return {
        accessToken,
        refreshToken,
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
        },
    );

    return null;
};

const getRefreshToken = async (token: string) => {
    // verify token

    const decoded = await verifyToken(token, config.jwt_refresh_secret as string);

    const { user, iat } = decoded as JwtPayload;

    const authUser = await User.isUserExistsByCustomId(user);

    // checking if the user is exists
    if (!authUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
    }

    // checking if the user is already deleted
    if (await User.isUserDeleted(authUser.isDeleted)) {
        throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
    }

    // // checking if the user is already blocked
    if (await User.isUserBlocked(authUser.status)) {
        throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
    }

    if (
        authUser.passwordChangeAt &&
        (await User.isJWTissuedBeforePasswordChange(
            authUser.passwordChangeAt,
            iat as number,
        ))
    ) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are not Authorized');
    }

    const jwtPayload = { user: authUser.id, role: authUser.role };

    const accessToken = await createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_in as string,
    );

    return {
        accessToken,
        needChangePassword: authUser?.needChangePassword,
    };
};

const forgetPassword = async (userId: string) => {
    // checking if the user is exist

    const user = await User.isUserExistsByCustomId(userId);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    const jwtPayload = { user: user.id, role: user.role };
  
    const resetToken = await createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      '10m',
    );
  
    const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `;
  
    sendEmail(user.email, resetUILink);
  };
  
  const resetPassword = async (
    payload: { id: string; newPassword: string },
    token: string,
  ) => {
    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(payload?.id);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
  
    //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4
  
    if (payload.id !== decoded.user) {
      console.log(payload.id, decoded.user);
      throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
    }
  
    //hash new password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.salt),
    );
  
    await User.findOneAndUpdate(
      {
        id: decoded.user,
        role: decoded.role,
      },
      {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
      },
    );
  };

export const AuthService = {
    loginUser,
    changePassword,
    getRefreshToken,
    forgetPassword,
    resetPassword
};
