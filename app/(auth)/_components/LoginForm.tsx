"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { doCredentialLogin, doSocialLogin } from "../action";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please input email address.",
    })
    .email({
      message: "Please input valid email address.",
    }),
  password: z.string().min(1, {
    message: "Please input password",
  }),
  socialMethod: z.string().optional(),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      socialMethod: "Credentials",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.socialMethod === "Credentials") {
      const response = doCredentialLogin({
        email: data.email,
        password: data.password,
      });
      console.log(response);

      return;
    }
    await doSocialLogin({ socialMethod: data.socialMethod ?? "Google" });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mx-auto max-w-md w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="***" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center gap-3 flex-wrap">
            {["Credentials", "GitHub", "Google"].map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name="socialMethod"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value === item}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange(item)
                              : field.onChange("");
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
