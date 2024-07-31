import express from 'express';

import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { FacultyController } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    FacultyController.getSingleFaculty,
);

router.patch(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(updateFacultyValidationSchema),
    FacultyController.updateFaculty,
);

router.delete(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    FacultyController.deleteFaculty,
);

router.get(
    '/',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    FacultyController.getAllFaculties,
);

export const FacultyRoute = router;
