import joi from 'joi';

export const signupSchema = joi.object({
  email: joi.string().email().required(),
  avatar: joi
    .string()
    .uri()
    .pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|jpeg)/),
  password: joi.string().min(6).required(),
  confirmPassword: joi.ref('password'),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
