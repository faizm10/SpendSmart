import * as React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import AddTransactionForm from "@/components/addTransactionForm";
import { TransactionHistory } from "@/components/transaction-history";

export const metadata = {
  title: "Dashboard - SpendSmart",
  description: "Personal Dashbaord",
};

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <Alert className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          {/* <InfoIcon size="16" strokeWidth={2} /> */}
          This is a protected page that you can only see as an authenticated
          user
        </Alert>
        {/* <div className="flex space-x-2"> */}
        <AddTransactionForm userId={user.id} />
        <TransactionHistory userId={user.id} />
        {/* </div> */}
      </div>
      <div></div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
