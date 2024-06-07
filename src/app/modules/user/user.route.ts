import { Router } from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { studentValidations } from '../student/student.validation';
import { UserController } from './user.controller';

const router = Router();

router.post(
    '/create-student',
    requestValidation(studentValidations.createStudentValidationSchema),
    UserController.createStudent,
);

router.post(
    '/create-faculty',
    requestValidation(createFacultyValidationSchema),
    UserController.createFaculty,
  );
  
  router.post(
    '/create-admin',
    requestValidation(createAdminValidationSchema),
    UserController.createAdmin,
  );

export const UserRoute = router;
