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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import {
  resetCodeFormPayload,
  resetCodeFormSchema,
} from "@/schema/password.schema";

export default function ResetCodePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<resetCodeFormPayload>({
    resolver: zodResolver(resetCodeFormSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function onSubmit(values: resetCodeFormPayload) {
    console.log(values);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verifyResetCode`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.ok) {
          startTransition( () => {
            router.push("/resetPassword");
        } )
      } else {
        toast.error(data?.message || "Something went wrong!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="py-20 pt-7 max-w-2xl mx-auto px-2 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-center">Verify code</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* ________________ resetCode Field ________________ */}
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  {/* <Input placeholder="username@domain.com" {...field} /> */}
                  <InputOTP {...field} maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
