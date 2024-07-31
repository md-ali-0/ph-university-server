import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { CourseController } from './course.controller';
import {
    CourseValidations,
    createFacultyCourseSchema,
    removeFacultyCourseSchema,
} from './course.validation';

const router = Router();

router.post(
    '/',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(CourseValidations.createCourseValidationSchema),
    CourseController.createCourse,
);
router.patch(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(CourseValidations.updateCourseValidationSchema),
    CourseController.updateCourse,
);
router.put(
    '/:id/faculty-assign',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(createFacultyCourseSchema),
    CourseController.createAssignFaculty,
);
router.put(
    '/:id/faculty-remove',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(removeFacultyCourseSchema),
    CourseController.createAssignFaculty,
);

router.delete(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    CourseController.deleteCourse,
);

router.get(
    '/:courseId/get-faculties',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    CourseController.getFacultiesWithCourse,
);
router.get(
    '/',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    CourseController.getAllCourses,
);
router.get('/:id', CourseController.getSingleCourse);

export const CourseRoute = router;
