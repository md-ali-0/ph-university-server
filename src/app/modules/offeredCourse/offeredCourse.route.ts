import express from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.get(
    '/',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    OfferedCourseController.getAllOfferedCourses,
);

router.get(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    OfferedCourseController.getSingleOfferedCourses,
);

router.post(
    '/create-offered-course',
    requestValidation(
        OfferedCourseValidation.createOfferedCourseValidationSchema,
    ),
    OfferedCourseController.createOfferedCourse,
);

router.get(
    '/my-offered-courses',
    auth(USER_ROLE.student),
    OfferedCourseController.getMyOfferedCourses,
);

router.patch(
    '/:id',
    requestValidation(
        OfferedCourseValidation.updateOfferedCourseValidationSchema,
    ),
    OfferedCourseController.updateOfferedCourse,
);

router.delete('/:id', OfferedCourseController.deleteOfferedCourseFromDB);

export const OfferedCourseRoute = router;
