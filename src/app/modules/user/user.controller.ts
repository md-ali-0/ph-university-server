import { Request, Response } from 'express';
import { UserService } from './user.service';
import userValidationSchema from './user.validation';

const createStudent = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const zodParseData = userValidationSchema.parse(payload)

        const result = await UserService.createStudent(zodParseData);

        res.status(201).json({
            status: true,
            massage: 'Student Created Successfully',
            data: result,
        });
    } catch (error : any) {
        console.log(error);
        
        res.status(500).json({
            status: false,
            massage: error.massage || 'Something Went Wrong',
            error: error,
        });
    }
};

export const UserController = {
    createStudent,
};
