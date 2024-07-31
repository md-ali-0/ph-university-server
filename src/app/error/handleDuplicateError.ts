/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { IErrorSources, TGenericError } from '../interface/error';

const handleDuplicateError = (error: any): TGenericError => {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = 'Validation Error';

    const match = error.message.match(/"([^"]*)"/g);
    const value = match.map((match: string) => match.slice(1, -1));

    const errorSources: IErrorSources[] = [
        {
            path: '',
            message: `${value} is already exists`,
        },
    ];

    return {
        statusCode,
        message,
        errorSources,
    };
};

export default handleDuplicateError;
