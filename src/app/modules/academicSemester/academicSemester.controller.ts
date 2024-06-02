import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
    const payload = req.body;
    const result =
        await AcademicSemesterService.createAcademicSemester(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Student fetched Successfully',
        data: result,
    });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
    const id = req.params.semesterId;
    const payload = req.body;
    const result = await AcademicSemesterService.updateAcademicSemester(
        id,
        payload,
    );
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Student fetched Successfully',
        data: result,
    });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.getAllAcademicSemesters();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student fetched Successfully',
        data: result,
    });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const id: string = req.params.semesterId;

    const result = await AcademicSemesterService.getSingleAcademicSemester(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student fetched Successfully',
        data: result,
    });
});

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester,
};
