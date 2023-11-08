"use client";

import { HTMLAttributes, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { catchError, cn } from "@/lib/utils";
import { UserSignInSchema, userSignInSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";

interface UserSignInFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserSignInForm({ className, ...props }: UserSignInFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInSchema>({
    resolver: zodResolver(userSignInSchema),
  });

  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const disabled = isLoadingEmail || isLoadingGoogle;

  const continueWithGoogle = async () => {
    setIsLoadingGoogle(true);
    try {
      await signIn("google", {
        callbackUrl: searchParams?.get("from") || "/",
      });
    } catch (err) {
      catchError(err);
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  async function onSubmit(data: UserSignInSchema) {
    setIsLoadingEmail(true);
    try {
      const res = await signIn("credentials", {
        callbackUrl: searchParams?.get("from") || "/",
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log(res);

      if (res) {
        if (res.ok) {
          router.refresh();
        } else {
          toast.error("Email or password does not match");
        }
      }
    } catch (err) {
      catchError(err);
    } finally {
      setIsLoadingEmail(false);
    }
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
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={disabled}
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
            <PasswordInput
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={disabled}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <LoadingButton isLoading={isLoadingEmail} disabled={disabled}>
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
      <LoadingButton
        icon="google"
        type="button"
        variant="outline"
        onClick={continueWithGoogle}
        isLoading={isLoadingGoogle}
        disabled={disabled}
      >
        Continue with Google
      </LoadingButton>
    </div>
  );
}
