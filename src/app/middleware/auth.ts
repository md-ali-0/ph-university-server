import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/AppError';
import { IUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { catchAsync } from '../utils/catchAsync';

export const auth = (...requestRoles: IUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;

            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You are not Authorized',
                );
            }

            // verify token
            let decoded
            try {
                 decoded = jwt.verify(
                    token,
                    config.jwt_access_secret as string,
                );
            } catch (error) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'UnAuthorized');
            }

            const { user, role, iat } = decoded as JwtPayload;

            const auhUser = await User.isUserExistsByCustomId(user);

            // checking if the user is exists
            if (!auhUser) {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    'The user is not found',
                );
            }

            // checking if the user is already deleted
            if (await User.isUserDeleted(auhUser.isDeleted)) {
                throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
            }

            // // checking if the user is already blocked
            if (await User.isUserBlocked(auhUser.status)) {
                throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
            }

            if (
                auhUser.passwordChangeAt &&
                (await User.isJWTissuedBeforePasswordChange(
                    auhUser.passwordChangeAt,
                    iat as number,
                ))
            ) {
                throw new AppError(
                    httpStatus.FORBIDDEN,
                    'You are not Authorized',
                );
            }

            if (requestRoles && !requestRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You are not Authorized',
                );
            }
            req.user = { user, role };

            next();
        },
    );
};
