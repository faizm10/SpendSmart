"use client";

import type React from "react";
import { createClient } from "@/utils/supabase/server";
import { useState, useEffect } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, MinusCircle } from "lucide-react";
interface AddTransactionFormProps {
  userId: string;
}

export default function AddTransactionForm({
  userId,
}: AddTransactionFormProps) {
  const [supabase] = useState(() => createPagesBrowserClient());
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<
    { id: string; name: string; color: string }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({
        title: "Missing user",
        description: "User not loaded yet. Please wait and try again.",
        variant: "destructive",
      });
      return;
    }

    if (
      !amount ||
      isNaN(Number.parseFloat(amount)) ||
      Number.parseFloat(amount) <= 0
    ) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      });
      return;
    }

    if (!category) {
      toast({
        title: "Missing category",
        description: "Please select a category for this transaction.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Inserting with userId:", userId);

    try {
      await supabase.from("transactions").insert({
        user_id: userId,
        category_id: category,
        amount: parseFloat(amount),
        type,
        description,
        transaction_date: new Date().toISOString().split("T")[0],
      });

      toast({
        title: "Transaction added",
        description: `${type === "income" ? "Income" : "Expense"} of $${amount} has been recorded.`,
      });

      // Reset form
      setAmount("");
      setCategory("");
      setDescription("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, color")
        .order("name", { ascending: true });

      if (!error && data) {
        setCategories(data);
      } else {
        toast({
          title: "Error loading categories",
          description: error?.message ?? "Something went wrong",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, [supabase, toast]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          {type === "income" ? (
            <PlusCircle className="h-5 w-5 text-green-500" />
          ) : (
            <MinusCircle className="h-5 w-5 text-red-500" />
          )}
          Add Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.length === 0 ? (
                  <SelectItem disabled value="no-categories">
                    No categories
                  </SelectItem>
                ) : (
                  categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: cat.color }}
                        ></div>
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            ></Input>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !userId}
          >
            {isSubmitting ? "Adding..." : "Add Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
