import express from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { AdminController } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get('/', AdminController.getAllAdmins);

router.get('/:id', AdminController.getSingleAdmin);

router.patch(
    '/:id',
    requestValidation(updateAdminValidationSchema),
    AdminController.updateAdmin,
);

router.delete('/:adminId', AdminController.deleteAdmin);

export const AdminRoute = router;
