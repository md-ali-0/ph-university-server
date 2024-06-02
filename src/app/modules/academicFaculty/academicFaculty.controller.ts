import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(
        payload as IAcademicFaculty,
    );

    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: 'AcademicFaculty Created Successfully',
        data: result,
    });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const id = req.params.facultyId;
    const payload = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(
        id,
        payload,
    );
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'AcademicFaculty Updated Successfully',
        data: result,
    });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.getAllAcademicFaculties();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculty fetched Successfully',
        data: result,
    });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const id: string = req.params.facultyId;

    const result = await AcademicFacultyService.getSingleAcademicFaculty(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculty fetched Successfully',
        data: result,
    });
});

export const AcademicFacultyController = {
    createAcademicFaculty,
    updateAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
};
