import { NextFunction, Request, Response, Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
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
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        req.body = JSON.parse(req.body.data);
        next();
    },
    requestValidation(studentValidations.createStudentValidationSchema),
    UserController.createStudent,
);

router.post(
    '/create-faculty',
    auth(USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },

    requestValidation(createFacultyValidationSchema),
    UserController.createFaculty,
);

router.post(
    '/create-admin',
    // auth(USER_ROLE.ADMIN),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        req.body = JSON.parse(req.body.data);
        next();
    },
    requestValidation(createAdminValidationSchema),
    UserController.createAdmin,
);

router.post(
    '/change-status/:id',
    auth('admin'),
    requestValidation(userValidationSchema.changeStatusValidationSchema),
    UserController.changeStatus,
);

router.get(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
    UserController.getMe,
);

export const UserRoute = router;
