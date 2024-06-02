import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentService.getAllStudents();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student fetched Successfully',
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
})

export const StudentController = {
    getAllStudents,
    getSingleStudent,
};
