import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Component1 } from "@/components/charts/bargraph";
import { Component } from "@/components/charts/linechart";
import FlipText from "@/components/ui/flip-text";

export default async function Dashboard() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
    {/* add the user name by fetching */}
    <div className="p-4">
    <FlipText
      className="text-3xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]"
      word="Hello There"
    />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <Component1 />
      <Component />
      <Component />
      
    </div>
    </>
  );
}
