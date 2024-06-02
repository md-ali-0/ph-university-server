import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Student } from '../student/student.model';

const findLastStudentID = async () => {
    const lastStudent = await Student.findOne({}, { id: 1, _id: 0 }).sort({createdAt: -1}).lean();

    return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentID = async (payload: IAcademicSemester) => {
    // year semester_name code 4_digit_code
    
    // first time
    let currentID = (0).toString(); //by default
    
    //  2030 01 0002
    const lastStudentID = await findLastStudentID();

    
    const currentSemesterCode = payload.code
    const currentSemesterYear = payload.year
    
    if (lastStudentID) {
        
        const lastStudentSemesterCode = lastStudentID.substring(4,6)
        const lastStudentSemesterYear = lastStudentID.substring(0,4)
        
        if (lastStudentSemesterCode === currentSemesterCode && lastStudentSemesterYear === currentSemesterYear) {
            currentID = lastStudentID.substring(6)
        }
    }

    let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');

    incrementID = `${payload.year}${payload.code}${incrementID}`;

    return incrementID;
};
