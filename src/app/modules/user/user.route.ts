import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post(
    '/create-student',
    // requestValidation(studentValidations.createStudentValidationSchema),
    UserController.createStudent,
);

export const UserRoute = router;
