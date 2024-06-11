import express from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.get('/', OfferedCourseController.getAllOfferedCourses);

router.get('/:id', OfferedCourseController.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  requestValidation(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.patch(
  '/:id',
  requestValidation(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);

router.delete(
  '/:id',
  OfferedCourseController.deleteOfferedCourseFromDB,
);

export const OfferedCourseRoute = router;