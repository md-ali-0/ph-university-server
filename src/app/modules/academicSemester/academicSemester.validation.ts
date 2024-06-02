import { z } from 'zod';
import { code, month, name } from './academicSemester.constance';

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...name] as [string, ...string[]]),
        code: z.enum([...code] as [string, ...string[]]),
        year: z.string({ required_error: 'Year is Required' }),
        startMonth: z.enum([...month] as [string, ...string[]]),
        endMonth: z.enum([...month] as [string, ...string[]]),
    }),
});

const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...name] as [string, ...string[]]).optional(),
        code: z.enum([...code] as [string, ...string[]]).optional(),
        year: z.string({ required_error: 'Year is Required' }).optional(),
        startMonth: z.enum([...month] as [string, ...string[]]).optional(),
        endMonth: z.enum([...month] as [string, ...string[]]).optional(),
    }),
});

export const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
};
