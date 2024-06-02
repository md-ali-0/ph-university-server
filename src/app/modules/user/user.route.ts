import { Router } from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { UserController } from './user.controller';

const router = Router();

router.post(
    '/create-student',
    requestValidation(studentValidations.createStudentValidationSchema),
    UserController.createStudent,
);

export const UserRoute = router;
