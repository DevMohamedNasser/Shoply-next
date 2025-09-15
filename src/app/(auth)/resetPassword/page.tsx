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
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import {
  resetPassFormPayload,
  resetPassFormSchema,
} from "@/schema/password.schema";

export default function ResetPassword() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<resetPassFormPayload>({
    resolver: zodResolver(resetPassFormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  async function onSubmit(values: resetPassFormPayload) {
    // console.log(values);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/resetPassword`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        startTransition(() => {
          router.push("/login");
        });
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
      <h1 className="text-3xl font-bold mb-8 text-center">Reset Now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* ________________ Email Field ________________ */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="username@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ________________ Password Field ________________ */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="username@domain.com" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
