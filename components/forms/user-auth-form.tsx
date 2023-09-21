"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { UserAuthSchema, userAuthSchema } from "@/lib/validations/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthSchema>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const [isEmailLoading, setIsEmailLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  const continueWithGoogle = async () => {
    setIsGoogleLoading(true);

    try {
      await signIn("google", { callbackUrl: searchParams?.get("from") || "/" });
    } catch (err) {
      console.error(err);
      return toast({
        title: "Authentication Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  async function onSubmit(data: UserAuthSchema) {
    setIsEmailLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/",
    });

    setIsEmailLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
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
              disabled={isGoogleLoading || isEmailLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className={cn(buttonVariants())}
            disabled={isGoogleLoading || isEmailLoading}
          >
            {isEmailLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
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
        disabled={isGoogleLoading || isEmailLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Continue with Google
      </Button>
    </div>
  );
}
