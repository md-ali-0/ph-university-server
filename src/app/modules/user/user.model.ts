import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
    {
        id: {
            type: String,
            required: true,
            unique: true
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

// before
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(this.password, config.salt);
    next();
});

export const User = model<IUser>('user', userSchema);
