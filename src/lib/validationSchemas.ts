import { z } from 'zod'

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Food Listing Schemas
export const createFoodListingSchema = z.object({
  foodType: z.string().min(1, 'Food type is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  expiresAt: z.string().min(1, 'Expiry date is required'),
  image: z.string().optional(),
})

export const claimFoodSchema = z.object({
  requiredQuantity: z.string().min(1, 'Quantity is required'),
  notes: z.string().optional(),
  pickupLocation: z.string().min(1, 'Pickup location is required'),
})

// Report Schema
export const reportSchema = z.object({
  listingId: z.string().min(1, 'Listing is required'),
  reason: z.enum(['fraud', 'expired', 'quality', 'other'] as const),
  description: z.string().min(10, 'Description must be at least 10 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CreateFoodListingInput = z.infer<typeof createFoodListingSchema>
export type ClaimFoodInput = z.infer<typeof claimFoodSchema>
export type ReportInput = z.infer<typeof reportSchema>
