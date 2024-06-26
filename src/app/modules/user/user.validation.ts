import { z } from 'zod';
import { UserStatus } from './user.constant';

const passwordChangeValidationSchema = z.object({
    password: z
        .string({ invalid_type_error: 'password must be string' })
        .max(20, { message: "Password Can't be more then 20 characters" })
        .optional(),
});

const changeStatusValidationSchema = z.object({
    body: z.object({
      status: z.enum([...UserStatus] as [string, ...string[]]),
    }),
  });

export const userValidationSchema = {
    passwordChangeValidationSchema,
    changeStatusValidationSchema
};
