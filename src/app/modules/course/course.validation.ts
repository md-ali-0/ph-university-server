import { z } from 'zod';

export const PreRequisiteCoursesSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
  })

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credit: z.number(),
        preRequisiteCourses: z.array(PreRequisiteCoursesSchema).optional(),
        isDeleted: z.boolean().optional()
    }),
});

const updateCourseValidationSchema = createCourseValidationSchema.partial()

export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema
}