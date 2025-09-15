import * as z from "zod";

export const AddressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "cartId is required." }),
  details: z
    .string()
    .nonempty({ message: "Address is required." })
    .min(3, "Name must be at least 3 chars long."),
  city: z
    .string()
    .nonempty({ message: "Address is required." })
    .min(3, "Name must be at least 3 chars long."),

  phone: z
    .string()
    .nonempty({ message: "Phone is required." })
    .regex(/^(002|\+2)?01[0-25][0-9]{8}$/, {
      message: "Invalid egyptian phone number.",
    }),
    paymentMethod: z.enum(['cash', 'card'], {message: 'Payment method is required.'}),
});

export type addressFormType = z.infer<typeof AddressFormSchema>;

export const addressFormState = {
  success: false,
  error: {
    cartId: [],
    details: [],
    city: [],
    phone: [],
    paymentMethod: [],
  },
  message: null,
  callbackUrl: ''
};

export type addressFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];
  };
  message: null | string;
  paymentMethod?: string,
  callbackUrl?: string;
};
