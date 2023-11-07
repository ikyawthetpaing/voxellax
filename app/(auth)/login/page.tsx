import { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserSignInForm } from "@/components/forms/user-sign-in-form";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to your account on ${siteConfig.name} to access exclusive features, make purchases, and enjoy a personalized experience.`,
};

export default function SignInPage() {
  return (
    <Shell layout="auth">
      <Card className="space-y-6 max-sm:border-none max-sm:shadow-none sm:p-6">
        <CardHeader className="space-y-1 p-0">
          <CardTitle className="text-2xl">
            Log in to {siteConfig.name}
          </CardTitle>
          <CardDescription>
            Login to your account to make purchases and for more features.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-0">
          <UserSignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2 p-0">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1">Don&apos;t have an account?</span>
            <Link
              href="/register"
              className="text-muted-foreground underline-offset-4 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </div>
          <span className="cursor-not-allowed text-sm text-muted-foreground underline-offset-4 transition-colors hover:underline">
            Reset password
          </span>
        </CardFooter>
      </Card>
    </Shell>
  );
}
