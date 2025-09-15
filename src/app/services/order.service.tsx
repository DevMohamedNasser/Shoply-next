"use server";
import { getUserToken } from "@/lib/server-utils";
import {
  AddressFormSchema,
  addressFormStateType,
} from "@/schema/address.schema";

export async function handlePayment(
  formState: addressFormStateType,
  formData: FormData
) : Promise<addressFormStateType> {
  const shippingAddress = {
    details: formData.get("details"),
    phone: formData.get("phone"),
    city: formData.get("city"),
  };

  const cartId = formData.get("cartId");
  //   console.log(cartId);
  const paymentMethod = formData.get("paymentMethod")?.toString();
  console.log("paymentMethod", formData, paymentMethod);

  const parseData = AddressFormSchema.safeParse({
    ...shippingAddress,
    cartId,
    paymentMethod,
  });
  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error?.flatten().fieldErrors,
      message: null,
      callbackUrl: "/cart",
    };
  }
  try {
    const endpoint =
      paymentMethod === "cash"
        ? `api/v1/orders/${cartId}`
        : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;

    const token = await getUserToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Failed to place order",
        callbackUrl: "/cart",
        paymentMethod,
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Order placed successfully",
      callbackUrl: paymentMethod === 'cash' ? "/allorders" : data.session.url,
      paymentMethod,
    };
  } catch (error) {
    return {
      success: false,
      error: {},
      message: (error as Error).message || "Failed to place order",
    };
  }
}
