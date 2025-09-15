import * as z from "zod";

export const registerFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required." })
    .min(3, "Name must be at least 3 chars long."),
  email: z.email({ message: "Plz enter a valid email address." }),
  password: z
    .string()
    .nonempty({ message: "Password is required." })
    .min(6, "Password must be at least 6 chars long."),
  rePassword: z
    .string()
    .nonempty({ message: "Password is required." })
    .min(6, "Password must be at least 6 chars long."),
phone: z.string().nonempty({message: 'Phone is required.'}).regex(/^(002|\+2)?01[0-25][0-9]{8}$/, {message: "Invalid egyptian phone number."})
}).refine(data => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ['rePassword']
});

export type RegisterSchema = z.infer<typeof registerFormSchema>;


export const formState = {
  success: false,
  error: {},
  message: null,
};

export type formStateType = {
  success: boolean,
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  },
  message: null | string,
};