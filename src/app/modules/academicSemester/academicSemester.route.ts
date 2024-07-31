import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = Router();

router.post(
    '/create-academic-semester',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(
        AcademicSemesterValidation.createAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.createAcademicSemester,
);

router.patch(
    '/:semesterId',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(
        AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.updateAcademicSemester,
);

router.get(
    '/all',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    AcademicSemesterController.getAllAcademicSemesters,
);
router.get(
    '/:semesterId',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    AcademicSemesterController.getSingleAcademicSemester,
);

export const AcademicSemesterRoute = router;
