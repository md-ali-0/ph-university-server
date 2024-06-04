import httpStatus from 'http-status';
import { Error } from 'mongoose';
import { IErrorSources, TGenericError } from '../interface/error';

const handleValidationError = (error: Error.ValidationError) : TGenericError => {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = 'Validation Error';
    const errorSources: IErrorSources[] = Object.values(error.errors).map(
        (value: Error.ValidatorError | Error.CastError) => {
            return {
                path: value.path,
                message: value.message,
            };
        },
    );

    return {
        statusCode,
        message,
        errorSources,
    };
};


export default handleValidationError