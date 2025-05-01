"use client";
import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TransactionHistoryProps {
  userId: string;
}
export function TransactionHistory({ userId }: TransactionHistoryProps) {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [transactions, setTransactions] = useState<any[]>([]);
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>

            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id}>
              <TableCell>
                {new Date(txn.transaction_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={txn.type === "Income" ? "default" : "destructive"}
                >
                  {txn.type}
                </Badge>
              </TableCell>

              <TableCell>{txn.description}</TableCell>
              <TableCell className="text-right">
                ${parseFloat(txn.amount).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
