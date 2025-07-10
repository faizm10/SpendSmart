"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setLoading(false);
    router.push("/sign-in");
  }

  return (
    <Button onClick={handleSignOut} disabled={loading} variant="outline">
      {loading ? "Signing out..." : "Sign Out"}
    </Button>
  );
} 