// src/schemas/authenticationSchema.ts
import {z} from 'zod';

// Define the authentication schema using Zod
export const authenticationSchema = z.object({
  username: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

// Export the type for React Hook Form
export type AuthenticationFormData = z.infer<typeof authenticationSchema>;
