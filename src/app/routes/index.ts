import { Router } from 'express';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AdminRoute } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { CourseRoute } from '../modules/course/course.route';
import { EnrolledCourseRoute } from '../modules/enrolledCourse/enrolledCourse.route';
import { FacultyRoute } from '../modules/faculty/faculty.route';
import { OfferedCourseRoute } from '../modules/offeredCourse/offeredCourse.route';
import { SemesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { StudentRoute } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
    { path: '/auth', route: AuthRoute },
    { path: '/student', route: StudentRoute },
    { path: '/user', route: UserRoute },
    { path: '/faculty', route: FacultyRoute },
    { path: '/admins', route: AdminRoute },
    { path: '/academic-semester', route: AcademicSemesterRoute },
    { path: '/academic-faculty', route: AcademicFacultyRoute },
    { path: '/academic-department', route: AcademicDepartmentRoute },
    { path: '/course', route: CourseRoute },
    { path: '/semester-registration', route: SemesterRegistrationRoute },
    { path: '/offered-course', route: OfferedCourseRoute },
    { path: '/enroll-course', route: EnrolledCourseRoute },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
