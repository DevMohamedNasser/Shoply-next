import * as z from 'zod';

export const forgetPassFormSchema = z.object({
  email: z.email({ message: "Plz enter a valid email address." })
});

export type forgetPassFormPayload = z.infer<typeof forgetPassFormSchema>;


export const resetCodeFormSchema = z.object({
  resetCode: z.string().nonempty('Reset code is required.')
});

export type resetCodeFormPayload = z.infer<typeof resetCodeFormSchema>;


export const resetPassFormSchema = z.object({
  email: z.email({ message: "Plz enter a valid email address." }),
  newPassword: z.string().nonempty('New password is required.').min(6, {message: 'Password must be at least 6 chars'})
});

export type resetPassFormPayload = z.infer<typeof resetPassFormSchema>;