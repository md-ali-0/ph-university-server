import { Router } from 'express';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { StudentRoute } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
    { path: '/student', route: StudentRoute },
    { path: '/user', route: UserRoute },
    { path: '/academicSemester', route: AcademicSemesterRoute },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
