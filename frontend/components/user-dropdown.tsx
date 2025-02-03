import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/context/auth";

export function UserDropDown() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogOut = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Not necessary for onClick but doesn't cause issues
    try {
      await logOut();
      router.push("/"); // Redirect to home page after logout
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={handleLogOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </DropdownMenu>
  );
}
