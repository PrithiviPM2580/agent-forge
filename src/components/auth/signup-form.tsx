"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { signUpSchema, type SignUpSchema } from "@/schema/auth";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function signInWithProvider(provider: "github" | "google") {
    await authClient.signIn.social(
      {
        provider,
      },
      {
        onSuccess: () => {
          router.push("/workflow");
          toast.add({
            type: "success",
            description: `Logged in with ${provider} successfully`,
          });
        },
        onError: (ctx) => {
          toast.add({
            type: "error",
            description:
              ctx.error.message ||
              `An error occurred while logging in with ${provider}`,
            priority: "high",
          });
        },
      },
    );
  }
  async function onSubmit(data: SignUpSchema) {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/workflow",
      },
      {
        onSuccess: () => {
          router.push("/workflow");

          toast.add({
            type: "success",
            description: "Registered successfully",
          });
        },

        onError: (ctx) => {
          toast.add({
            type: "error",
            description:
              ctx.error.message || "An error occurred while registering",
            priority: "high",
          });
        },
      },
    );
  }

  const isPending = form.formState.isSubmitting;
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => signInWithProvider("github")}
                  variant="outline"
                  className="w-full"
                  type="button"
                  disabled={isPending}
                >
                  <Image
                    alt="GitHub"
                    src="/github.svg"
                    width={20}
                    height={20}
                  />
                  Continue with GitHub
                </Button>
                <Button
                  onClick={() => signInWithProvider("google")}
                  variant="outline"
                  className="w-full"
                  type="button"
                  disabled={isPending}
                >
                  <Image
                    alt="Google"
                    src="/google.svg"
                    width={20}
                    height={20}
                  />
                  Continue with Google
                </Button>
              </div>
              <div className="grid gap-6">
                <FieldGroup>
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-name">
                          Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-demo-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="John Doe"
                          type="text"
                          autoComplete="name"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-email">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-demo-email"
                          aria-invalid={fieldState.invalid}
                          placeholder="you@example.com"
                          type="email"
                          autoComplete="email"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-password">
                          Password
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-demo-password"
                          aria-invalid={fieldState.invalid}
                          placeholder="••••••••"
                          type="password"
                          autoComplete="current-password"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <div className="w-full flex flex-col gap-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    form="form-rhf-demo"
                  >
                    Sign Up
                  </Button>
                  <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="underline underline-offset-4 hover:text-primary/70"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
