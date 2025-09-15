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
  forgetPassFormPayload,
  forgetPassFormSchema,
} from "@/schema/password.schema";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<forgetPassFormPayload>({
    resolver: zodResolver(forgetPassFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: forgetPassFormPayload) {
    // console.log(values);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPasswords`,
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
        if (data.statusMsg === 'success') {
            startTransition( () => {
                router.push("/resetCode");
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
      <h1 className="text-3xl font-bold mb-8 text-center">Sent Email</h1>
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
          
          <Button type="submit" disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin" /> : "Sent Email"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
