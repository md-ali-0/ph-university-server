import { Router } from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = Router();

router.post(
    '/create-academic-department',
    requestValidation(
        academicDepartmentValidation.createAcademicDepartmentSchema,
    ),
    AcademicDepartmentController.createAcademicDepartment,
);
router.patch(
    '/:departmentId',
    requestValidation(
        academicDepartmentValidation.updateAcademicDepartmentSchema,
    ),
    AcademicDepartmentController.updateAcademicDepartment,
);

router.get('/all', AcademicDepartmentController.getAllAcademicDepartments);
router.get(
    '/:departmentId',
    AcademicDepartmentController.getSingleAcademicDepartment,
);

export const AcademicDepartmentRoute = router;
