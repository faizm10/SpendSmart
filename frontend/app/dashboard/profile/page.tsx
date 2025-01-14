import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Profile() {
  const supabase = await createClient();

  // Fetch authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user details from the "users" table using email
  const { data: userDetails, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (error) {
    console.error("Error fetching user details:", error.message);
    return (
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="bg-red-500 text-sm p-3 px-5 rounded-md text-white flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          Failed to fetch user details.
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user.
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(userDetails, null, 2)}
        </pre>
      </div>
    </div>
  );
}
