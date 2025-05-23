import {z} from 'zod';

export const CreateProductSchema = z.object({
  title: z.string().min(3, 'Title is required and should be at least 3 letters long'),
  description: z.string().min(5, 'Description is required'),
  price: z.string().refine(val => !isNaN(Number(val)), {
    message: 'Price must be a valid number',
  }),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;
