import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = Router();

router.post(
    '/create-academic-semester',
    requestValidation(
        AcademicSemesterValidation.createAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.createAcademicSemester,
);

router.patch(
    '/:semesterId',
    requestValidation(
        AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.updateAcademicSemester,
);

router.get('/all', auth(USER_ROLE.admin), AcademicSemesterController.getAllAcademicSemesters);
router.get('/:semesterId', AcademicSemesterController.getSingleAcademicSemester);

export const AcademicSemesterRoute = router;
