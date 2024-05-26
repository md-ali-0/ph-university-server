import { Router } from 'express';
import { StudentRoute } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';

const router = Router();

router.use('/student', StudentRoute);
router.use('/user', UserRoute);

export default router;
