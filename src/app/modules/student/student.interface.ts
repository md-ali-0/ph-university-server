import { Model } from "mongoose";

export type IUserName = {
    firstName: string;
    lastName: string;
};

export type IStudent = {
    id: number;
    name: IUserName;
    age: number;
    email: string;
    password: string,
    gender: 'male' | 'female';
    dateOfBirth?: string;
    contact?: string;
    avatar?: string;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
};


// export type IStudentMethod = {
//     isUserExits(id: number) : Promise<IStudent | null>
// }

// export type StudentModel = Model<IStudent, {}, IStudentMethod>;

export interface StudentModel extends Model<IStudent> {
    isUserExits(id: number) : Promise<IStudent | null>
}