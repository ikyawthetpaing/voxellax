import { Metadata } from "next";
import { UserAuthForm } from "@/components/form/user-auth-form";
import { BackButton } from "@/components/back-button";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account to make purchases and for more features",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <BackButton variant="ghost">Back</BackButton>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to the login page!
          </h1>
          <p className="text-sm text-muted-foreground">
            Please provide your credentials to access your account securely.
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}
