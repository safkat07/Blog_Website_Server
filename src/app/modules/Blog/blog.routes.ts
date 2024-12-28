import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../Middlewares/auth';
import validateRequest from '../../Middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();


router.get('/', BlogController.GetAllBlogs);

router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidation.CreateBlogValidationShecma),
  BlogController.CreateBlog,
);

router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidation.UpdateBlogValidationShecma),
  BlogController.UpdateBlog,
);


router.delete('/:id', auth('user'), BlogController.DeleteBlog);

export const BlogRoutes = router;
