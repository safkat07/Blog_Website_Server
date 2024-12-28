import { Router } from 'express';
import { UserControllers } from './auth.controller';
import validateRequest from '../../Middlewares/validateRequest';
import AuthValidation from './auth.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidation.RegisterValidationSchema),
  UserControllers.CreateUser,
);
router.post(
  '/login',
  validateRequest(AuthValidation.LoginValidationSchema),
  UserControllers.LoginUser,
);

export const AuthRoutes = router;
