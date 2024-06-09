import { Router } from "express";
import { requestValidation } from "../../middleware/validateRequest";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { semesterRegistrationValidation } from "./semesterRegistration.validation";

const router = Router()

router.patch('/:id', requestValidation(semesterRegistrationValidation.updateSemesterRegistration), SemesterRegistrationController.updateSemesterRegistration)

router.post('/create-semester-registration', requestValidation(semesterRegistrationValidation.createSemesterRegistration), SemesterRegistrationController.createSemesterRegistration)

router.get('/all', SemesterRegistrationController.getAllSemesterRegistration)
router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration)

export const SemesterRegistrationRoute = router