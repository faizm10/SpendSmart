import { signInAction } from "@/app/actions"
import { FormMessage, type Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams
  return (
    <div className="bg-card shadow-sm rounded-lg p-8">
      <form className="flex flex-col w-full">
        <h1 className="text-2xl font-medium text-center mb-2">Sign in</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Don't have an account?{" "}
          <Link className="text-primary font-medium hover:underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-muted-foreground hover:text-primary hover:underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input type="password" name="password" placeholder="Your password" required />
          </div>

          <SubmitButton className="w-full mt-2" pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>

          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  )
}
