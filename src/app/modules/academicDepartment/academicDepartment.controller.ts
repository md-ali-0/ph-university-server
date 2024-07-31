import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartment(
        payload as IAcademicDepartment,
    );

    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: 'AcademicDepartment Created Successfully',
        data: result,
    });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const id = req.params.departmentId;
    const payload = req.body;
    const result = await AcademicDepartmentService.updateAcademicDepartment(
        id,
        payload,
    );
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'AcademicDepartment Updated Successfully',
        data: result,
    });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.getAllAcademicDepartments(
        req.query,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicDepartment fetched Successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const id: string = req.params.departmentId;

    const result =
        await AcademicDepartmentService.getSingleAcademicDepartment(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicDepartment fetched Successfully',
        data: result,
    });
});

export const AcademicDepartmentController = {
    createAcademicDepartment,
    updateAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
};
