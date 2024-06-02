import { Router } from 'express';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { StudentRoute } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
    { path: '/student', route: StudentRoute },
    { path: '/user', route: UserRoute },
    { path: '/academic-semester', route: AcademicSemesterRoute },
    { path: '/academic-faculty', route: AcademicFacultyRoute },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
