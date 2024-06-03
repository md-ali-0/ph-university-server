import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const status = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'something went wrong';
    return res.status(status).json({
        status: false,
        message,
        error,
    });
};

export default globalErrorHandler;
