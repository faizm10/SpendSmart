"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Validation schema
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormData = z.infer<typeof signupSchema>;

export default function SignupContent() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      signupSchema.parse(formData);

      // Send data to backend
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Account created! You can now sign in.");
      router.push("/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative min-h-screen flex items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters with uppercase, lowercase
                and numbers.
              </p>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function SignupPage() {
  return <SignupContent />;
}
