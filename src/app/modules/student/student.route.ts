import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();

router.get('/single/:id', StudentController.getSingleStudent);
router.get('/all', StudentController.getAllStudents);

export const StudentRoute = router;
