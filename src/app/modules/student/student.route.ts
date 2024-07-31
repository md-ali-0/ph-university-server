import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { StudentController } from './student.controller';

const router = Router();

router.get(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    StudentController.getSingleStudent,
);
router.get(
    '/',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    StudentController.getAllStudents,
);
router.patch(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    StudentController.updateStudent,
);
router.delete(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    StudentController.deleteStudent,
);

export const StudentRoute = router;
