import { Response } from 'express';

interface IResponse<X> {
    statusCode: number;
    success: boolean;
    message: string;
    data: X;
}

const sendResponse = async <X>(res: Response, data: IResponse<X>) => {
    return res.status(data?.statusCode).json({
        success: data?.success,
        message: data?.message,
        data: data?.data,
    });
};

export default sendResponse;
