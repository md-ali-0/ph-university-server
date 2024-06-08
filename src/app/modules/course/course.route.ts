import { Router } from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidations, createFacultyCourseSchema, removeFacultyCourseSchema } from './course.validation';

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
router.put(
    '/:id/faculty-assign',
    requestValidation(createFacultyCourseSchema),
    CourseController.createAssignFaculty,
);
router.put(
    '/:id/faculty-remove',
    requestValidation(removeFacultyCourseSchema),
    CourseController.createAssignFaculty,
);

router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);

export const CourseRoute = router;
