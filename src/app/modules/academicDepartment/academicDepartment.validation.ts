import { z } from 'zod';

const createAcademicDepartmentSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is Required',
        }),
        academicFaculty: z.string({
            required_error: 'Academic Faculty is Required',
        }),
    }),
});
const updateAcademicDepartmentSchema = z.object({
    body: z.object({
        name: z
            .string({
                required_error: 'Name is Required',
            })
            .optional(),
        academicFaculty: z
            .string({
                required_error: 'Academic Faculty is Required',
            })
            .optional(),
    }),
});

export const academicDepartmentValidation = {
    createAcademicDepartmentSchema,
    updateAcademicDepartmentSchema,
};
