import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px]">
            <div className="flex flex-col gap-4 mt-4">
              <Link href="/" className="text-lg font-semibold">
                Home
              </Link>
              <Link href="/about" className="text-lg">
                About
              </Link>
              <Link href="/features" className="text-lg">
                Features
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="font-bold text-xl mr-6">
          Logo
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="/features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <Link href="/dashboard">
              <Button variant="default">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
