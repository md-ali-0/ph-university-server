import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../error/AppError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import handleValidationError from '../error/handleValidationError';
import handleZodError from '../error/handleZodError';
import { IErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
    let message = 'something went wrong';
    let errorSources: IErrorSources[] = [
        {
            path: '',
            message: 'something went wrong',
        },
    ];

    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (error?.code === 11000) {
        const simplifiedError = handleDuplicateError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    } else if (error instanceof AppError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error.message,
            },
        ];
    } else if (error instanceof Error) {
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error.message,
            },
        ];
    }

    return res.status(statusCode).json({
        status: false,
        message,
        errorSources,
        stack: config.node_env === 'development' ? error?.stack : null,
    });
};

export default globalErrorHandler;

/*
success
message
errorSource


*/
