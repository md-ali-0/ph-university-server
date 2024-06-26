import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { studentValidations } from '../student/student.validation';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
import { userValidationSchema } from './user.validation';

const router = Router();

router.post(
    '/create-student',
    auth(USER_ROLE.admin),
    requestValidation(studentValidations.createStudentValidationSchema),
    UserController.createStudent,
);

router.post(
    '/create-faculty',
    auth(USER_ROLE.admin),
    requestValidation(createFacultyValidationSchema),
    UserController.createFaculty,
);

router.post(
    '/create-admin',
    // auth(USER_ROLE.ADMIN),
    requestValidation(createAdminValidationSchema),
    UserController.createAdmin,
);

router.post(
    '/change-status/:id',
    auth('admin'),
    requestValidation(userValidationSchema.changeStatusValidationSchema),
    UserController.changeStatus,
);

router.get('/me', auth('student', 'faculty', 'admin'), UserController.getMe);

export const UserRoute = router;
