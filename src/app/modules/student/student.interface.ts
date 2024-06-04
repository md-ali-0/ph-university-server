import { Model, Types } from "mongoose";

export type IUserName = {
    firstName: string;
    lastName: string;
};

export type IGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
  };
  
  export type ILocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };

export type IStudent = {
    id: string;
    user: Types.ObjectId;
    name: IUserName;
    age: number;
    email: string;
    gender: 'male' | 'female';
    dateOfBirth?: Date;
    contact?: string;
    avatar?: string;
    permanentAddress: string;
    guardian: IGuardian;
    localGuardian: ILocalGuardian;
    academicDepartment: Types.ObjectId;
    admissionSemester: Types.ObjectId;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    isDeleted: boolean;
};


// export type IStudentMethod = {
//     isUserExits(id: number) : Promise<IStudent | null>
// }

// export type StudentModel = Model<IStudent, {}, IStudentMethod>;

export interface StudentModel extends Model<IStudent> {
    isUserExits(id: number) : Promise<IStudent | null>
}