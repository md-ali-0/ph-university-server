import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(3, "First Name can't be less than 3 characters")
        .max(20, "First Name can't be greater than 20 characters")
        .trim()
        .regex(/^[A-Z][a-z]*$/, {
            message:
                'First Name must start with an uppercase letter and contain only alphabetic characters',
        })
        .transform(str => str.trim()),

    lastName: z
        .string()
        .min(3, "Last Name can't be less than 3 characters")
        .max(20, "Last Name can't be greater than 20 characters")
        .trim()
        .regex(/^[a-zA-Z]+$/, {
            message: 'Last Name must contain only alphabetic characters',
        })
        .transform(str => str.trim()),
});

const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string(),
        student: z.object({
            name: userNameValidationSchema,
            age: z.number().min(0, 'Age must be a positive number'),
            email: z.string().email('Invalid email address'),
            gender: z.enum(['male', 'female'], {
                errorMap: issue => ({
                    message: `${issue.message} is not valid. Gender can be male or female`,
                }),
            }),
            dateOfBirth: z.string().optional(),
            contact: z.string().trim(),
            bloodGroup: z.enum([
                'A+',
                'A-',
                'B+',
                'B-',
                'AB+',
                'AB-',
                'O+',
                'O-',
            ]),
            admissionSemester: z.string({
                required_error: 'Academic Semester is Required',
            }),
            academicDepartment: z.string(),
            presentAddress: z.string().trim(),
        }),
    }),
});

const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameValidationSchema,
            gender: z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloogGroup: z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            guardian: updateGuardianValidationSchema.optional(),
            localGuardian: updateLocalGuardianValidationSchema.optional(),
            admissionSemester: z.string().optional(),
            academicDepartment: z.string().optional(),
        }),
    }),
});

export const studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
