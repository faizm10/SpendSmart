import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TransactionHistory } from "@/components/transaction-history";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { FinancialCards } from "@/components/financial-cards";
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  return (
    <div className="space-y-6">
      {/* Welcome alert */}
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Welcome to your dashboard. Here you can see all of your financial
          overview including income, transaction history and more!
        </AlertDescription>
      </Alert>

      {/* Header with title and action button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/transactions">Add Transaction</Link>
        </Button>
      </div>

      {/* Financial overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance card */}
        <FinancialCards userId={user.id} />
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionHistory userId={user.id} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* User details card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Member since{" "}
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <details className="text-xs">
                    <summary className="font-medium cursor-pointer">
                      View account details
                    </summary>
                    <pre className="mt-2 p-3 bg-muted rounded max-h-40 overflow-auto">
                      {JSON.stringify(user, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <ArrowUpIcon className="mr-2 h-4 w-4" />
                Add Income
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ArrowDownIcon className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUpIcon className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
