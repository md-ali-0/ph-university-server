import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/AppError';
import { IUserRole } from '../modules/user/user.interface';
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

            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            );

            const { user, role } = decoded as JwtPayload;
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
