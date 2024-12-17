"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LoginContent() {
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const router = useRouter();

  useEffect(() => {
    if (verified) {
      toast.success("Email verified successfully! Please sign in.");
    }
  }, [verified]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Signed in successfully!");
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      toast.error("An error occurred during sign in");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <div className="container relative min-h-screen flex items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to sign in to your account
            </p>
          </div>

          <div className="grid gap-6">
            {/* <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue with Google
            </Button> */}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              {/* <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div> */}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Sign In
              </Button>
            </form>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  return <LoginContent />;
}
