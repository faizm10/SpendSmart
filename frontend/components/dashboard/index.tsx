"use client";
import TypingAnimation from "@/components/ui/typing-animation";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function Chat() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";

  return (
    <>
      <div className="">
        
      </div>
    </>
  );
}
