"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  AddressFormSchema,
  addressFormState,
  addressFormType,
} from "@/schema/address.schema";
import { handlePayment } from "@/app/services/order.service";
import { useCart } from "@/context/cartContext";
import { toast } from "sonner";
import { useFormState } from "react-dom";

export default function CheckoutPage() {
  const { cartDetails, setCartDetails } = useCart();
  const router = useRouter();
  const [action, formAction] = useFormState(handlePayment, addressFormState);

  const form = useForm<addressFormType>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      details: "",
      city: "",
      phone: "",
      cartId: "",
      paymentMethod: "cash",
    },
  });

  useEffect(() => {
    if (cartDetails) {
      form.setValue("cartId", cartDetails.cartId);
    }
  }, [cartDetails, form, setCartDetails]);

  console.log(action);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (action) {
      if (action.success && action.message) {
        if (action.paymentMethod === "cash") {
          toast.success(action.message, {
            position: "top-right",
          });
          setCartDetails(null);
          timeout = setTimeout(() => {
            router.push(action.callbackUrl || '/');
          }, 2000);
        } else {
          window.location.href = action.callbackUrl as string;
        }
      } else if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-right",
        });
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [setCartDetails, action, router ]);

  return (
    <section className="py-20  mt-7 max-w-2xl mx-auto px-2 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          {/* ________________ cartId Field ________________ */}
          <FormField
            control={form.control}
            name="cartId"
            render={({ field }) => (
              <FormItem hidden>
                <FormControl>
                  <Input {...field} value={cartDetails?.cartId} hidden />
                </FormControl>
              </FormItem>
            )}
          />
          {/* ________________ Details Field ________________ */}
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Details</FormLabel>
                <FormControl>
                  <Input placeholder="Address Details" {...field} />
                </FormControl>
                <FormMessage>{action.error?.details?.[0]}</FormMessage>
              </FormItem>
            )}
          />
          {/* ________________ City Field ________________ */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage>{action.error?.city?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* ________________ phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} type="tel" />
                </FormControl>
                <FormMessage>{action.error?.phone?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          {/* ________________ radio btn Field */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={"cash"}
                    name={field.name}
                    className="flex flex-col"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="cash" />
                      </FormControl>
                      <FormLabel className="font-normal">Cash</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="card" />
                      </FormControl>
                      <FormLabel className="font-normal">Card</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}
