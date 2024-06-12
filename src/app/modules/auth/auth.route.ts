import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = Router();

router.post(
    '/',
    requestValidation(authValidation.loginValidationSchema),
    AuthController.loginUser,
);
router.post(
    '/change-password',
    auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
    requestValidation(authValidation.changePasswordValidationSchema),
    AuthController.changePassword,
);

export const AuthRoute = router;
