import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { IErrorSources, TGenericError } from "../interface/error";

const handleZodError = (error: ZodError) : TGenericError => {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = 'Validation Error';
    const errorSources: IErrorSources[] = error.issues.map(
        (issue: ZodIssue) => {
            return {
                path: issue.path[issue.path.length - 1],
                message: issue.message,
            };
        },
    );
    return {
        statusCode,
        message,
        errorSources,
    };
};

export default handleZodError