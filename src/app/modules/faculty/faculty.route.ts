import express from 'express';

import { requestValidation } from '../../middleware/validateRequest';
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

router.get('/', FacultyController.getAllFaculties);

export const FacultyRoute = router;
