import { Router } from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidations } from './course.validation';

const router = Router();

router.post(
    '/',
    requestValidation(CourseValidations.createCourseValidationSchema),
    CourseController.createCourse,
);
router.patch(
    '/:id',
    requestValidation(CourseValidations.updateCourseValidationSchema),
    CourseController.updateCourse,
);

router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);

export const CourseRoute = router;
