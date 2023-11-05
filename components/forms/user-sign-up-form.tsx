"use client";

import { HTMLAttributes, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addUser } from "@/lib/actions/user";
import { catchError, cn } from "@/lib/utils";
import { UserSignUpSchema, userSignUpSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { LoadingButton } from "@/components/loading-button";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpSchema>({
    resolver: zodResolver(userSignUpSchema),
  });

  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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

  async function onSubmit(data: UserSignUpSchema) {
    startTransition(async () => {
      try {
        const res = await addUser(data);

        if (res.ok) {
          toast.success("Account created successfully.");
          router.push("/sign-in");
        } else {
          toast.error(res.error);
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
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                First Name
              </Label>
              <Input
                placeholder="First Name"
                {...register("firstName")}
                disabled={isPending}
              />
              {errors?.firstName && (
                <p className="px-1 text-xs text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Last Name
              </Label>
              <Input
                placeholder="Last Name"
                {...register("lastName")}
                disabled={isPending}
              />
              {errors?.lastName && (
                <p className="px-1 text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
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
            Sign Up
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
