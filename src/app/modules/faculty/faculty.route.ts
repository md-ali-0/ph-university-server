import express from 'express';

import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { FacultyController } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);

router.patch(
    '/:id',
    requestValidation(updateFacultyValidationSchema),
    FacultyController.updateFaculty,
);

router.delete('/:id', FacultyController.deleteFaculty);

router.get('/', auth(USER_ROLE.admin), FacultyController.getAllFaculties);

export const FacultyRoute = router;
