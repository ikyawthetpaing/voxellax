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
import { UserSignUpForm } from "@/components/forms/user-sign-up-form";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to make purchases and for more features.",
};

export default function SignUpPage() {
  return (
    <Shell layout="auth">
      <Card className="space-y-6 max-sm:border-0 max-sm:shadow-none sm:p-6">
        <CardHeader className="space-y-1  p-0">
          <CardTitle className="text-2xl">
            Sign up for {siteConfig.name}
          </CardTitle>
          <CardDescription>
            Create an account to make purchases and for more features.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4  p-0 ">
          <UserSignUpForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2  p-0 ">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1">Have an account?</span>
            <Link
              href="/sign-in"
              className="text-muted-foreground underline-offset-4 transition-colors hover:underline"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  );
}
