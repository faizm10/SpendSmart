"use client";

import { LINE_GRAPH_DATA } from "@/lib/data";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function LineGraph() {
  return (
    <ResponsiveContainer width="100%" minHeight={300} className="-mx-5 mt-2">
      <LineChart data={LINE_GRAPH_DATA}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
          }}
        />
        <Legend />
        <Line
          name="Income"
          type="monotone"
          dataKey="income"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
        />
        <Line
          name="Expenses"
          type="monotone"
          dataKey="expenses"
          stroke="hsl(var(--destructive))"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
