import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyService } from './faculty.service';
;

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyService.getSingleFacultyFromDB( id );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyService.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved succesfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyService.updateFacultyIntoDB( id , faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated succesfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const {  id } = req.params;
  const result = await FacultyService.deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};