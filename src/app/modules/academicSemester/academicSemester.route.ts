import { Router } from 'express';
import { requestValidation } from '../../middleware/validateRequest';
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

router.get('/all', AcademicSemesterController.getAllAcademicSemesters);
router.get('/:semesterId', AcademicSemesterController.getSingleAcademicSemester);

export const AcademicSemesterRoute = router;
