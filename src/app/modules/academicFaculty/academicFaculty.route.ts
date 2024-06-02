import { Router } from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = Router();

router.post(
    '/create-academic-faculty',
    requestValidation(academicFacultyValidation.academicFacultySchema),
    AcademicFacultyController.createAcademicFaculty,
);
router.patch(
    '/:facultyId',
    requestValidation(academicFacultyValidation.academicFacultySchema),
    AcademicFacultyController.updateAcademicFaculty,
);

router.get('/all', AcademicFacultyController.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

export const AcademicFacultyRoute = router;
