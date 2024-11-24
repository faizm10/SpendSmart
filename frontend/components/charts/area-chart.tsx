"use client";

import { SCATTER_CHART_DATA } from "@/lib/data";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SavingsSpendingChart() {
  return (
    <ResponsiveContainer width="100%" minHeight={300} className="-mx-5 mt-2">
      <AreaChart
        data={SCATTER_CHART_DATA}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        {/* Add grid for visual clarity */}
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />

        {/* X-Axis with month labels */}
        <XAxis
          dataKey="month"
          type="category"
          name="Month"
          tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
          interval={0}
        />

        {/* Y-Axis with formatted values */}
        <YAxis
          type="number"
          name="Amount"
          tickFormatter={(value) => `$${value}`}
          tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
        />

        {/* Tooltip with custom styles */}
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
          }}
          formatter={(value: number, name: string) => [`$${value}`, name]}
          itemStyle={{
            color: "inherit",
          }}
        />

        {/* Legend for Savings and Spending */}
        <Legend
          iconType="circle"
          wrapperStyle={{
            top: 0,
            textAlign: "center",
          }}
          formatter={(value) => (
            <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>
          )}
        />

        {/* Area for Savings */}
        <Area
          type="monotone"
          dataKey="savings"
          name="Savings"
          stroke="hsl(146, 61%, 45%)" /* Bright green for savings */
          fill="hsl(146, 61%, 75%)" /* Light green for fill */
          strokeWidth={2}
        />

        {/* Area for Spending */}
        <Area
          type="monotone"
          dataKey="spending"
          name="Spending"
          stroke="hsl(0, 78%, 50%)" /* Bright red for spending */
          fill="hsl(0, 78%, 100%)" /* Light red for fill */
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
