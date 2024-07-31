import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { semesterRegistrationValidation } from './semesterRegistration.validation';

const router = Router();

router.patch(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(
        semesterRegistrationValidation.updateSemesterRegistration,
    ),
    SemesterRegistrationController.updateSemesterRegistration,
);

router.post(
    '/create-semester-registration',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(
        semesterRegistrationValidation.createSemesterRegistration,
    ),
    SemesterRegistrationController.createSemesterRegistration,
);

router.get(
    '/all',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    SemesterRegistrationController.getAllSemesterRegistration,
);
router.get(
    '/:id',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    SemesterRegistrationController.getSingleSemesterRegistration,
);

export const SemesterRegistrationRoute = router;
