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

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      router.push("/"); // Redirect to home page after logout
    } catch (error) {
      setError(error.message);
      console.error("Logout error:", error.message);
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
