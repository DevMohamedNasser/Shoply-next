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
import {
  formState,
  registerFormSchema,
  RegisterSchema,
} from "@/schema/register.schema";
import { handleRegister } from "@/app/services/register.services";
import { useActionState, useEffect, useTransition } from "react";
import { LoaderCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [action, formAction] = useActionState(handleRegister, formState);
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      rePassword: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!action.success && action.message) {
      toast.error(action.message, {
        position: "top-right",
      });
    }
    if (action.success && action.message) {
      startTransition(() => {
        router.push("/login");
      });
      toast.success(action.message, {
        position: "top-right",
      });
    }
  }, [action, router]);

  return (
    <section className="py-20  pt-7 max-w-2xl mx-auto px-2 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          {/* ________________ Name Field ________________ */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage>{action.error?.name?.[0]}</FormMessage>
              </FormItem>
            )}
          />
          {/* ________________ Email Field ________________ */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username@domain.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage>{action.error?.email?.[0]}</FormMessage>
              </FormItem>
            )}
          />
          {/* ________________ Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="**********"
                    {...field}
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage>{action.error?.password?.[0]}</FormMessage>
              </FormItem>
            )}
          />
          {/* ________________ rePassword Field */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="**********"
                    {...field}
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage>{action.error?.rePassword?.[0]}</FormMessage>
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
                  <Input placeholder="" {...field} type="tel" />
                </FormControl>
                <FormMessage>{action.error?.phone?.[0]}</FormMessage>
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <LoaderCircle className="animate-spin"></LoaderCircle>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
