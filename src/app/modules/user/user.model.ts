import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
    {
        id: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        needChangePassword: {
            type: Boolean,
            required: true,
            default: true,
        },
        role: {
            type: String,
            enum: ['admin', 'student', 'faculty'],
            required: true,
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            required: true,
            default: 'in-progress',
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

export const User = model<IUser>('user', userSchema);
