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
            presentAddress: z.string().trim(),
        }),
    }),
});

export const studentValidations = {
    createStudentValidationSchema,
};
