import { z } from 'zod';

const academicFacultySchema = z.object({
    body: z.object({ name: z.string({ required_error: 'Name is Required' }) }),
});

export const academicFacultyValidation = {
    academicFacultySchema,
};
