import { Schema, model } from 'mongoose';
import validator from 'validator';
import { IStudent, IUserName, StudentModel } from './student.interface';

const UserNameSchema = new Schema<IUserName>(
    {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First Name Can't be less then 3"],
            maxlength: [20, "First Name Can't be greater then 20"],
            trim: true,
            // validate: function (value: string) {
            //     const firstName = value.charAt(0).toUpperCase + value.slice(1);
            //     if (value !== firstName) {
            //         return false;
            //     }
            //     return true;
            // },
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, "Last Name Can't be less then 3"],
            maxlength: [20, "Last Name Can't be greater then 20"],
            trim: true,
            // validate: {
            //     validator: (value: string)=> validator.isAlpha(value),
            //     message: " {VALUE} is not Valid."
            // }
        },
    },
    {
        _id: false,
        versionKey: false,
    },
);

const StudentSchema = new Schema<IStudent, StudentModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User Id is Required'],
            ref: 'User',
            unique: true,
        },
        name: { type: UserNameSchema, required: true },
        age: { type: Number, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value: string) => validator.isEmail(value),
                message: ' {VALUE} is not Valid Email.',
            },
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female'],
                message: '{VALUE} is not valid. Gender Can be male or female.',
            },
            required: true,
        },
        dateOfBirth: { type: Date, trim: true },
        contact: { type: String, trim: true },
        avatar: { type: String, trim: true },
        bloodGroup: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
            required: true,
        },
        admissionSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        presentAddress: { type: String, trim: true },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

// StudentSchema.post('save', function (doc, next) {
//     console.log('after');
//     next();
// });

// for creating static

StudentSchema.statics.isUserExits = async function (id: number) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
};

// interface StudentModel extends Model<IStudent> {
//     myStaticMethod(): number;
//   }

// creating custom instance method
// StudentSchema.methods.isUserExits = async function (id: number) {
//     const existingUser = await Student.findOne({ id });
//     return existingUser;
// };

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
