import { z } from 'zod';

// Updated Schema with Name and Phone Number
export const createAccountSchema = z.object({
  username: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  name: z.string().min(3, "Name must be at least 3 characters."),
  phoneNumber: z.string().regex(/^\d{8,15}$/, "Invalid phone number."),
});

export type CreateAccountSchemaFormData = z.infer<typeof createAccountSchema>;
