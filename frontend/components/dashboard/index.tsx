"use client";
import BlurFade from "@/components/ui/blur-fade";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";

  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalIncome: 0,
    totalExpenses: 0,
    netWorth: 0,
  });

  // Fetch user transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();

        setTransactions(data);
        calculateStats(data); // Process data to calculate stats
      } catch (error) {
        console.error(error);
        toast.error("Failed to load transactions");
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const calculateStats = (data: Transaction[]) => {
    const totalIncome = data
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = data
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const netWorth = totalIncome - totalExpenses;
    setStats({
      totalTransactions: data.length,
      totalIncome,
      totalExpenses,
      netWorth,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <BlurFade delay={0.25 * 2} inView>
          <h1 className="text-2xl font-bold tracking-tight sm:text-5xl mb-6">
            {`Hi, ${user?.name || "Anonymous User"}!`}
          </h1>
        </BlurFade>
      </div>

      {/* Stats Section */}
      <BlurFade delay={0.25 * 4} inView>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-gray-100 p-4 rounded shadow text-center dark:text-black ">
            <h2 className="text-xl font-semibold">Total Transactions</h2>
            <p className="text-2xl font-bold">{stats.totalTransactions}</p>
          </div>
          <div className="bg-yellow-400 p-4 rounded shadow text-center dark:text-black ">
            <h2 className="text-xl font-semibold">Net Worth</h2>
            <p className="text-2xl font-bold">$ {stats.netWorth}</p>
          </div>
          <div className="bg-green-700 p-4 rounded shadow text-center dark:text-black ">
            <h2 className="text-xl font-semibold">Total Income</h2>
            <p className="text-2xl font-bold">
              ${stats.totalIncome ? stats.totalIncome.toFixed(2) : "0.00"}
            </p>
          </div>
          <div className="bg-red-700 p-4 rounded shadow text-center dark:text-black ">
            <h2 className="text-xl font-semibold">Total Expenses</h2>
            <p className="text-2xl font-bold">
              ${stats.totalExpenses ? stats.totalExpenses.toFixed(2) : "0.00"}
            </p>
          </div>
        </div>
      </BlurFade>
      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
    </div>
  );
}
