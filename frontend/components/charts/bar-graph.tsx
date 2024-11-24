"use client";

import { BAR_CHART_DATA } from "@/lib/data";
import {
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";

export default function SpendingByCategoryChart() {
  return (
    <ResponsiveContainer width="100%" minHeight={300} className="-mx-5 mt-2">
      <BarChart data={BAR_CHART_DATA}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="category"
          label={{ value: "Category", position: "insideBottom", dy: 10 }}
        />
        <YAxis
          dataKey="amount"
          label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
          }}
          formatter={(value: number) => [`$${value}`, "Amount"]}
        />
        <Legend />
        <Bar
          type="monotone"
          name="Amount Spent"
          dataKey="amount"
          fill="hsl(var(--primary))"
          barSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
