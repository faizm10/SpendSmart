import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeaderAuth() {
  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
} 