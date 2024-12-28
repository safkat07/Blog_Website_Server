import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { BlogRoutes } from '../modules/Blog/blog.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
