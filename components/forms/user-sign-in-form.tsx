"use client";

import { HTMLAttributes, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { catchError, cn } from "@/lib/utils";
import { UserSignInSchema, userSignInSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

import { LoadingButton } from "../loading-button";

interface UserSignInFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserSignInForm({ className, ...props }: UserSignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInSchema>({
    resolver: zodResolver(userSignInSchema),
  });

  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const continueWithGoogle = () => {
    startTransition(async () => {
      try {
        await signIn("google", {
          callbackUrl: searchParams?.get("from") || "/",
        });
      } catch (err) {
        catchError(err);
      }
    });
  };

  async function onSubmit(data: UserSignInSchema) {
    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          callbackUrl: searchParams?.get("from") || "/",
          email: data.email,
          password: data.password,
        });

        if (res && !res.ok) {
          toast.error("Email or password does not match");
        }
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isPending}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <LoadingButton isLoading={isPending} disabled={isPending}>
            Login
          </LoadingButton>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={continueWithGoogle}
        disabled={isPending}
      >
        {isPending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Continue with Google
      </Button>
    </div>
  );
}
