/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const status = httpStatus.NOT_FOUND;
    const message = `Requested URL: ${req.originalUrl} Not Found`;
    return res.status(status).json({
        status: false,
        message,
        error: '',
    });
};

export default notFoundHandler;
