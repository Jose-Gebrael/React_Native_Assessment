import {z} from 'zod';

export const createAccountSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  firstName: z.string().min(3, 'Name must be at least 3 characters.'),
  lastName: z.string().min(3, 'Name must be at least 3 characters.'),
  //phoneNumber: z.string().regex(/^\d{8,15}$/, 'Invalid phone number.'),
  profileImage: z.any().optional(),
});

export type CreateAccountSchemaFormData = z.infer<typeof createAccountSchema>;
