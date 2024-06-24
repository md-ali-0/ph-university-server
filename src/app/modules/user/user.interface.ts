import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
    id: string;
    email: string;
    password: string;
    needChangePassword: boolean;
    passwordChangeAt: Date;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
    isUserExistsByCustomId(id: string): Promise<IUser>;
    isUserBlocked(status: string): Promise<boolean>;
    isUserDeleted(isDeleted: boolean): Promise<boolean>;
    isUserPasswordMatched(
        planePassword: string,
        hashPassword: string,
    ): Promise<boolean>;
    isJWTissuedBeforePasswordChange(
        passwordChangeTime: Date,
        JwtIssuedTime: number,
    ): Promise<boolean>;
}

export type IUserRole = keyof typeof USER_ROLE;
