import express from 'express';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { loginSchema, signupSchema } from '../schemas/authSchema';
import { authController } from '../controllers/authController';

const router = express.Router();

router.post(
  '/signup',
  validateSchemaMiddleware(signupSchema),
  authController.signup
);

router.post(
  '/login',
  validateSchemaMiddleware(loginSchema),
  authController.login
);

export default router;
