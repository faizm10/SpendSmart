"use client";
import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSignIcon,
  TrendingUpIcon,
} from "lucide-react";
// Placeholder data for financial overview
const financialOverview = {
  totalBalance: 2450.25,
  income: 3200.0,
  expenses: 749.75,
  savingsRate: 76.6, // percentage
};
interface FinancialCardsProps {
  userId: string;
}
export function FinancialCards({ userId }: FinancialCardsProps) {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [transactions, setTransactions] = useState<any[]>([]);
  const totalIncome = transactions
    ? transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + (Number.parseFloat(t.amount) || 0), 0)
    : 0;

  const totalExpenses = transactions
    ? transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(Number.parseFloat(t.amount) || 0), 0)
    : 0;

  const netCashflow = totalIncome - totalExpenses;
  useEffect(() => {
    const fetchTransactions = async () => {
      //fetch the data for user_id
      const { data, error } = await supabase
        .from("transactions")
        .select("id,category_id,amount,type,description,transaction_date")
        .eq("user_id", userId);
      if (error) {
        console.error("Supabase fetch error:", error.message);
      } else {
        console.log("Fetched transactions:", data);
        setTransactions(data || []); //load data into the array
      }
    };
    fetchTransactions();
  }, [supabase, userId]);
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${netCashflow.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Your current balance across all accounts
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${netCashflow.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Total income this month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Total expenses this month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {financialOverview.savingsRate}%
          </div>
          <p className="text-xs text-muted-foreground">
            Percentage of income saved
          </p>
        </CardContent>
      </Card>
    </>
  );
}
