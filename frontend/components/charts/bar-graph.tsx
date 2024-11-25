"use client";

import { BAR_CHART_DATA } from "@/lib/data";
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SharesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={BAR_CHART_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

// import {
//   CartesianGrid,
//   Legend,
//   Tooltip,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Bar,
//   BarChart,
// } from "recharts";

// export default function SpendingByCategoryChart() {
//   return (
//     <ResponsiveContainer width="100%" minHeight={300} className="-mx-5 mt-2">
//       <BarChart data={BAR_CHART_DATA}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="category"
//           label={{ value: "Category", position: "insideBottom", dy: 10 }}
//         />
//         <YAxis
//           dataKey="amount"
//           label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
//           tickFormatter={(value) => `$${value}`}
//         />
//         <Tooltip
//           contentStyle={{
//             backgroundColor: "hsl(var(--background))",
//           }}
//           formatter={(value: number) => [`$${value}`, "Amount"]}
//         />
//         <Legend />
//         <Bar
//           type="monotone"
//           name="Amount Spent"
//           dataKey="amount"
//           fill="hsl(var(--primary))"
//           barSize={60}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }
