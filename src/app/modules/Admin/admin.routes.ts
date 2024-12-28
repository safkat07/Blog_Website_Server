import express from 'express';
import auth from '../../Middlewares/auth';
import { AdminController } from './admin.controller';

const router = express.Router();

router.patch('/users/:userId/block', auth('admin'), AdminController.BlockUser);
router.delete('/blogs/:id', auth('admin'), AdminController.DeleteBlog);

export const AdminRoutes = router;
