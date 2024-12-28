import { z } from 'zod';

const CreateBlogValidationShecma = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Blog Title is required',
        invalid_type_error: 'Blog Title should be a string',
      })
      .min(3, "Blog Title can't be less than 3 characters")
      .max(50, "Blog Title can't be more than 50 characters"),
    content: z.string({
      required_error: 'Blog Content is required',
      invalid_type_error: 'Blog Content should be a string',
    }),
    isPublished: z
      .boolean({
        invalid_type_error: 'Blog isPublished should be a boolean',
      })
      .optional(),
  }),
});

const UpdateBlogValidationShecma = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Blog Title should be a string',
      })
      .min(3, "Blog Title can't be less than 3 characters")
      .max(50, "Blog Title can't be more than 50 characters")
      .optional(),
    content: z
      .string({
        invalid_type_error: 'Blog Content should be a string',
      })
      .optional(),
    isPublished: z
      .boolean({
        invalid_type_error: 'Blog isPublished should be a boolean',
      })
      .optional(),
  }),
});

export const BlogValidation = {
  CreateBlogValidationShecma,
  UpdateBlogValidationShecma,
};
