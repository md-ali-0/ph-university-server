import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
    
    const result = await StudentService.getAllStudents(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student fetched Successfully',
        data: result,
    });
});

const updateStudent = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { student } = req.body;
    const result = await StudentService.updateStudent(id, student);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student Updated Successfully',
        data: result,
    });
});

const getSingleStudent = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await StudentService.getSingleStudent(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student fetched Successfully',
        data: result,
    });
});

const deleteStudent = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await StudentService.deleteStudent(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student Deleted Successfully',
        data: result,
    });
});

export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent,
};
