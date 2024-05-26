import { Request, Response } from 'express';
import { StudentService } from './student.service';

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentService.getAllStudents();

        res.status(201).json({
            status: true,
            massage: 'Students Data Get Successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            status: false,
            massage: 'Something Went Wrong',
            error,
        });
    }
};
const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await StudentService.getSingleStudent(id);

        res.status(201).json({
            status: true,
            massage: 'Students Data Get Successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: true,
            massage: 'Something Went Wrong',
            error: error,
        });
    }
};

export const StudentController = {
    getAllStudents,
    getSingleStudent,
};
