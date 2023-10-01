import { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAuthForm } from "@/components/forms/user-auth-form";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign In to your account to make purchases and for more features",
};

export default function SignInPage() {
  return (
    <Shell layout="auth" className="max-sm:p-0">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Sign in to your account to make purchases and for more features
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <UserAuthForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Don&apos;t have an account?
            </span>
            <Link
              aria-label="Sign up"
              href="/signup"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href="/signin/reset-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  );
}
