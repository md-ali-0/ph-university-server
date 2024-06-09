import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
    const payload = req.body;
    const result =
        await SemesterRegistrationService.createSemesterRegistration(payload);
    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: 'SemesterRegistration Created Successfully',
        data: result,
    });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const id = req?.params?.id;
    const payload = req.body;
    const result =
        await SemesterRegistrationService.updateSemesterRegistration(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: 'SemesterRegistration Updated Successfully',
        data: result,
    });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationService.getAllSemesterRegistration(
        req.query,
    );
    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: 'SemesterRegistration Fetch Successfully',
        data: result,
    });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const result =
        await SemesterRegistrationService.getSingleSemesterRegistration(
            req?.params?.id,
        );
    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: 'SemesterRegistration Fetch Successfully',
        data: result,
    });
});

export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
};
