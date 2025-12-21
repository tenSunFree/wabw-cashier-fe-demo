import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('invalid email address'),
  password: z.string().min(8, 'password must be at least 8 character').max(50),
})

export const signInDraftSchema = z.object({
  email: z.string().email('invalid email address'),
  password: z
    .union([
      z.string().min(8, 'password must be at least 8 character').max(50),
      z.literal(''),
    ])
    .optional()
    .transform((v) => (v === '' || v == null ? undefined : v)),
})

// Use input type for forms to avoid resolver/type mismatches
export type SignInDraftFormValues = z.input<typeof signInDraftSchema>

// Only use the output type if truly need the transformed draft result
export type SignInDraftValues = z.output<typeof signInDraftSchema>

export type SignInValues = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  username: z.string().min(4, 'username must be at least 4 character').max(50),
  email: z.string().email('invalid email address'),
  password: z.string().min(8, 'password must be at least 8 character').max(50),
})

export type SignInPayload = z.infer<typeof signInSchema>
export type SignUpPayload = z.infer<typeof signUpSchema>
