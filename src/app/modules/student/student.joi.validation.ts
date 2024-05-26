import Joi from 'joi';

const userNameSchema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(20)
        .trim()
        .regex(
            /^[A-Z][a-z]*$/,
            'First name must start with an uppercase letter',
        )
        .messages({
            'string.min': "First Name can't be less than 3 characters",
            'string.max':
                "First Name can't be greater than 20 characters",
            'string.pattern.name':
                'First Name must start with an uppercase letter and contain only alphabetic characters',
        })
        .required(),

    lastName: Joi.string()
        .min(3)
        .max(20)
        .trim()
        .regex(/^[a-zA-Z]+$/, 'Alphabetic characters only')
        .messages({
            'string.min': "Last Name can't be less than 3 characters",
            'string.max':
                "Last Name can't be greater than 20 characters",
            'string.pattern.name':
                'Last Name must contain only alphabetic characters',
        })
        .required(),
});

export const studentSchema = Joi.object({
    name: userNameSchema.required(),
    age: Joi.number().required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
            'string.email': '{#value} is not a valid email',
        })
        .required(),
    gender: Joi.string()
        .valid('male', 'female')
        .messages({
            'any.only':
                '{#value} is not valid. Gender can be male or female',
        })
        .required(),
    dateOfBirth: Joi.string().trim(),
    contact: Joi.string().trim(),
    avatar: Joi.string().trim(),
    bloodGroup: Joi.string().valid(
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-',
    ),
    presentAddress: Joi.string().trim(),
});