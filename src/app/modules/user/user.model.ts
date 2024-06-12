import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: 0,
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
        passwordChangeAt: {
            type: Date,
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

userSchema.static('isUserExistsByCustomId', async function (id: string) {
    return await User.findOne({ id }).select('+password');
});
userSchema.static('isUserDeleted', async function (isDeleted) {
    return isDeleted;
});
userSchema.static('isUserBlocked', async function (status: string) {
    return status === 'blocked';
});

userSchema.static(
    'isUserPasswordMatched',
    async function (planePassword, hashPassword) {
        return await bcrypt.compare(planePassword, hashPassword);
    },
);

export const User = model<IUser, UserModel>('user', userSchema);
