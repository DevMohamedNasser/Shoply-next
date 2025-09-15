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
import { loginFormPayload, loginFormSchema } from "@/schema/login.schema";

import { signIn } from "next-auth/react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<loginFormPayload>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginFormPayload) {
    // console.log(values);

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      console.log(res);

      if (res?.ok) {
        startTransition(() => {
          // go to Home
          router.push("/");
        });
        toast.success("Login successfully!", { position: "top-right" });
      } else {
        toast.error(res?.error || "Something went wrong!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="py-20 pt-7 max-w-2xl mx-auto px-2 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
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
          {/* ________________ Email Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="**********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <div>
              <Link href={'/forgetPassword'} className="underline text-blue-400" >Forget Password?</Link>
            </div>
            

          <Button type="submit" disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin" /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </section>
  );
}
